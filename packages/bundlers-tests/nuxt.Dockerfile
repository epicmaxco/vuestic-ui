FROM node:18-alpine as build

WORKDIR /local-nuxt
COPY /nuxt .
WORKDIR /