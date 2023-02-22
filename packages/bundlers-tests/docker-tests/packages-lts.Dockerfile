FROM node:lts-alpine

WORKDIR /

COPY /ui /local-vuestic
COPY /nuxt /local-nuxt
COPY /vue-cli-plugin /local-cli
