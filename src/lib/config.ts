import { loadEnvConfig } from '@next/env'
import process from 'process'

const projectDir = process.cwd()
loadEnvConfig(projectDir)

const config = {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ?? '',
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ?? '',
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN ?? '',
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL ?? '',
}

// Validate required environment variables
const requiredEnvs = [
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN',
  'NEXT_PUBLIC_BASE_URL',
  'CLOUDINARY_CLOUD_NAME',
]
for (const env of requiredEnvs) {
  if (!config[env as keyof typeof config]) {
    throw new Error(`Missing required environment variable: ${env}`)
  }
}

export default config
