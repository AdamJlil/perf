FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy server files
COPY . .

# Expose the port the server runs on
EXPOSE 3001

# Set environment variables for Docker
ENV DOCKER_ENV=true

# Start the server
CMD ["node", "index.js"]
