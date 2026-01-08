import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { config } from './config.js'
import { DailyVolumeRepo } from '@debridge-test/db';

const dailyVolumeRepo = new DailyVolumeRepo();

const app = new Hono()

app.get('/health', (c) => {
  return c.text('ok')
})

app.get('/api/daily-volume', async (c) => {
  const from = c.req.query('from')
  const to = c.req.query('to')

  const data = await dailyVolumeRepo.getDailyVolume({ from, to });
  
  return c.json(data.map(el => ({ 
    day: el.day, 
    fulfilledVolumeUsd: Number.parseFloat(el.fulfilledVolumeUsd), 
    createdVolumeUsd: Number.parseFloat(el.createdVolumeUsd)
  })));
})

DailyVolumeRepo
serve({
  fetch: app.fetch,
  port: config.PORT
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
