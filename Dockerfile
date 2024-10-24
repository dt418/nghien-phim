# The base image (use Debian-based image for compatibility)
FROM oven/bun:1.1.2 AS base

# The "dependencies" stage
FROM base AS deps

# The application directory
WORKDIR /app

# Copy only package management files to install dependencies
COPY package.json ./

# Install dependencies, including devDependencies
RUN bun install --no-cache --dev

# Copy all
COPY . .

# The final image
FROM base AS production

# Create a group and a non-root user to run the app
RUN groupadd --gid 1001 "nodejs" \
    && useradd --uid 1001 --create-home --shell /bin/bash --groups "nodejs" "nextjs"

# The application directory
WORKDIR /app

# Ensure the .next directory exists
RUN mkdir -p /app/.next && chown -R nextjs:nodejs /app

# Copy only the node_modules from the deps stage (to cache dependencies)
COPY --from=deps /app/node_modules /app/node_modules

# Copy the rest of the application files
COPY --chown=nextjs:nodejs . .

# Enable development mode
ENV NODE_ENV=development

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Configure application port
ENV PORT=3000

# Expose the port the app will listen on
EXPOSE 3000

# Change the user
USER nextjs

# Run the app in development mode
CMD ["bun", "run", "next", "dev"]
