import * as path from 'path'
import { promises as fs } from 'fs'
import {
  Migrator,
  FileMigrationProvider,
  MigrationResultSet
} from 'kysely'
import { db } from './infra/db.js'

const directionKey = '--direction='

enum Direction {
  up = "up",
  down = "down",
}

function getDirestionFromArgv(): Direction {
  const arg = process.argv.find(el => el.startsWith(directionKey))?.replace(directionKey, "");
  if (arg != null && !Object.values(Direction).includes(arg as Direction)) {
    throw new Error(`unkwnown direction - ${arg}`)
  }
  return arg ? arg as Direction : Direction.up; 
}
 
async function migrateToLatest() {  
  const direction = getDirestionFromArgv();
  
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(import.meta.dirname, './migrations'),
    }),
  })

  let migrationResultSet: MigrationResultSet;
  if (direction == Direction.up) {
    migrationResultSet = await migrator.migrateToLatest();
  } else {
    migrationResultSet = await migrator.migrateDown();
  }
  
  const { error, results } = migrationResultSet;

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was ${direction == Direction.down ? "reverted" : "executed"} successfully`)
    } else if (it.status === 'Error') {
      console.error(`failed to ${direction == Direction.down ? "revert" : "execute"} migration "${it.migrationName}"`)
    }
  })

  if (error) {
    console.error('failed to migrate')
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}

migrateToLatest().catch(err => { 
  console.error(err); 
  process.exit(1)
})