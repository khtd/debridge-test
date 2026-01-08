import { cleanEnv, str, num } from 'envalid'

export const config = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'], default: "development" }),
  PORT: num({ default: 3000 }),
})