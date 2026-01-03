import { cleanEnv, str } from 'envalid'

export const config = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'], default: "development" }),
  DATABASE_URL: str(),
})