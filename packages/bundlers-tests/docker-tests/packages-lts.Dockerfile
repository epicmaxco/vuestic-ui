FROM node:lts-alpine as build

WORKDIR /

COPY /ui ./local-vuestic
COPY /nuxt ./local-nuxt
COPY /vue-cli-plugin ./local-cli