FROM node:22 AS build

ARG NODE_APP_DIR
ARG NODE_APP_NAME

WORKDIR /app

COPY . .

RUN npm ci --cache .npm --prefer-offline

RUN npm run build --workspace @debridge-test/frontend


# serve
FROM nginx:alpine

COPY --from=build /app/apps/frontend/dist /usr/share/nginx/html
COPY /apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf.template

RUN apk add --no-cache gettext
CMD envsubst '$FRONTEND_PORT $API_PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

EXPOSE 80
