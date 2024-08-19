# Stage 1: Build the React app
ARG NODE_VERSION=19.0.0-alpine3.16
FROM node:${NODE_VERSION} AS builder

WORKDIR /usr/src/app

ENV NODE_OPTIONS=--openssl-legacy-provider

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code and build the app
COPY . .
RUN npm run build

# Stage 2: Serve the React app using a lightweight server
FROM node:${NODE_VERSION} AS runner

WORKDIR /usr/src/app

ENV NODE_OPTIONS=--openssl-legacy-provider

# Copy build files from the builder stage
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Install a lightweight HTTP server to serve the build files
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
