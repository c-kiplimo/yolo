ARG NODE_VERSION=19.0.0-alpine3.16

FROM node:${NODE_VERSION} as builder

WORKDIR /usr/src/app

ENV NODE_OPTIONS=--openssl-legacy-provider

COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

RUN npm run build

FROM node:${NODE_VERSION} as runner

WORKDIR /usr/src/app

ENV NODE_OPTIONS=--openssl-legacy-provider

COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
