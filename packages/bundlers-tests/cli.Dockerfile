FROM node:18-alpine as build

WORKDIR /local-cli
COPY /vue-cli-plugin .
WORKDIR /