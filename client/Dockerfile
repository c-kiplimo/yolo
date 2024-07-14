# Stage 1: Base Stage
FROM node:19.0.0-alpine3.16 as builder

WORKDIR /usr/src/app

ENV NODE_OPTIONS=--openssl-legacy-provider

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build

# Stage 2: Production Stage
FROM gcr.io/distroless/nodejs18-debian11

WORKDIR /usr/src/app

# Copy package.json and production-built dependencies
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/build ./build

EXPOSE 3000

CMD ["node", "build/index.js"]
