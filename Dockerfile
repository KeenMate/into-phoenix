FROM node:lts-alpine as vuepress-base
RUN npm install -g vuepress

FROM vuepress-base as vuepress
ADD . /src
RUN echo $'#!/bin/ash\n\
npm ci\n\
vuepress build\n' >> /build.sh
CMD ["/build.sh"]

FROM abiosoft/caddy:no-stats
COPY --from=vuepress /src/.vuepress/dist /srv/