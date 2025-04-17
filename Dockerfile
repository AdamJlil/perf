# Use a smaller base image for the final container
FROM node:18-alpine as builder

WORKDIR /app

# Install only production dependencies to make the build faster
COPY package.json ./
RUN npm install --only=production

# Copy only necessary files for the build
COPY nuxt.config.ts ./
COPY app.vue ./
COPY components/ ./components/
COPY composables/ ./composables/
COPY layouts/ ./layouts/
COPY middleware/ ./middleware/
COPY pages/ ./pages/
COPY plugins/ ./plugins/
COPY public/ ./public/
COPY server/ ./server/
COPY types/ ./types/
COPY types.ts ./
COPY unocss.config.ts ./

# Install UnoCSS reset explicitly
RUN npm install @unocss/reset

# Build the application
ENV NODE_ENV=production
ENV NUXT_TELEMETRY_DISABLED=1
RUN npm run build

# Use a smaller image for the final container
FROM node:18-alpine

WORKDIR /app

# Copy only the built application from the previous stage
COPY --from=builder /app/.output/ ./.output/
COPY --from=builder /app/public/ ./public/

# Set production environment
ENV NODE_ENV=production

# Set the correct permission for prerender cache
RUN mkdir -p /app/.output && chown -R node:node /app

# Run as non-root user for better security
USER node

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["node", ".output/server/index.mjs"]
