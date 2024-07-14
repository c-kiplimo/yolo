FROM node:19.0.0-alpine3.16 as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

FROM gcr.io/distroless/nodejs18-debian11

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/server.js ./
COPY --from=builder /usr/src/app/config.js ./
COPY --from=builder /usr/src/app/routes ./routes
COPY --from=builder /usr/src/app/models ./models

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]
