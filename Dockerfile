FROM node:22-alpine AS builder

ARG NODE_APP_DIR
ARG NODE_APP_NAME

WORKDIR /app

COPY . .

RUN npm ci --cache .npm --prefer-offline

RUN npm run build --workspace @debridge-test/common
RUN npm run build --workspace @debridge-test/db
RUN npm run build --workspace @debridge-test/dln-idl
RUN npm run build --workspace "$NODE_APP_NAME"


FROM node:22-alpine AS runner

ARG NODE_APP_DIR
ARG NODE_APP_NAME

ENV NODE_APP_DIR=$NODE_APP_DIR

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

COPY --from=builder /app/packages /app/packages
COPY --from=builder "/app/$NODE_APP_DIR" "/app/$NODE_APP_DIR"

RUN npm prune --production --workspace "$NODE_APP_NAME"

CMD ["sh", "-c", "node $NODE_APP_DIR/dist/index.js"]
