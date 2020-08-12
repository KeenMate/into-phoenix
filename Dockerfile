FROM registry.km8.es/vuepress-base:latest as vuepress
ADD . /src
RUN echo $'#!/bin/ash\n\
npm ci && vuepress build\n' >> /build.sh
CMD ["/build.sh"]

FROM abiosoft/caddy:no-stats
COPY --from=vuepress /src/.vuepress/dist /srv/