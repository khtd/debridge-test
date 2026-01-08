import { cleanEnv, str, bool } from 'envalid'

export const config = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'], default: "development" }),
  USE_MOCK_PRICES: bool({ default: false }),
  CG_API_KEY: str({
    default: undefined,
    requiredWhen: (cleanedEnv) => !cleanedEnv["USE_MOCK_PRICES"],
  }),
})