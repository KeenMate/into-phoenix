FROM registry.km8.es/vuepress-base:latest as vuepress

WORKDIR /src
COPY . .
RUN npm ci && vuepress build

FROM abiosoft/caddy:no-stats
COPY --from=vuepress /src/.vuepress/dist /srv/