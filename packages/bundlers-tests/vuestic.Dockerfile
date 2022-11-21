FROM node:18-alpine as build

WORKDIR /local-vuestic
COPY /ui .
WORKDIR /