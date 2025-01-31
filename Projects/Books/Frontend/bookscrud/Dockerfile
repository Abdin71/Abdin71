# Dockerfile
# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN yarn install

# Copy source code
COPY . .

# Expose the app port
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]