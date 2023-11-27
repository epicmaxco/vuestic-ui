FROM node:18-alpine as build

WORKDIR /

COPY /ui /local-vuestic
COPY /nuxt /local-nuxt
