FROM node:18-alpine

WORKDIR /local-vuestic
COPY /ui .
#COPY /ui/dist .
#COPY /ui/package.json .
#COPY /ui/vite.config.ts .
WORKDIR /
