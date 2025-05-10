FROM node:18-alpine

RUN apk add --no-cache bash

WORKDIR /app

# Install dependencies from src/package.json
COPY src/package*.json ./
RUN npm install

# Copy source code
# COPY src ./src

WORKDIR /app
