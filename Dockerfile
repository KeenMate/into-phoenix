FROM node:lts-alpine as vuepress

ADD . /src
RUN npm install -g vuepress
RUN echo $'#!/bin/ash\n\
vuepress build\n' >> /build.sh
CMD ["/build.sh"]

FROM abiosoft/caddy:no-stats

COPY --from=vuepress /src/.vuepress/dist /srv/