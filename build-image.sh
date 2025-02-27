#!/bin/bash

# Read .env file and create environment variables
if [ -f ./.env ]; then
    # Load env vars while ignoring comments and empty lines
    export $(cat ./.env | grep -v '^#' | grep -v '^$' | xargs)
fi

# Build the docker command with environment variables
docker build \
    -t nghien-phim:latest \
    --build-arg UPSTASH_REDIS_REST_URL="${UPSTASH_REDIS_REST_URL}" \
    --build-arg UPSTASH_REDIS_REST_TOKEN="${UPSTASH_REDIS_REST_TOKEN}" \
    --build-arg CLOUDINARY_CLOUD_NAME="${CLOUDINARY_CLOUD_NAME}" \
    --build-arg NEXT_PUBLIC_BASE_URL="${NEXT_PUBLIC_BASE_URL}" \
    --no-cache \
    .
