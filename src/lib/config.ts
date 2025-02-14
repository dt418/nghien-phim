import { loadEnvConfig } from '@next/env';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const config = {
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL!,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN!,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL!,
};

export default config;
