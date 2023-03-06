FROM node:16-alpine as build

WORKDIR /

COPY /ui /local-vuestic
COPY /nuxt /local-nuxt
