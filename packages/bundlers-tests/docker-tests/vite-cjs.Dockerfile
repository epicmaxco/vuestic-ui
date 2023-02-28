FROM local-packages-lts:latest as build

RUN yarn create vite vite-app --template vue

WORKDIR /vite-app
RUN yarn add vuestic-ui@file:/local-vuestic
RUN yarn add material-design-icons-iconfont -D
RUN yarn add sass

WORKDIR /vite-app/src
COPY /templates/src .
COPY /templates/configs/main-cjs.js ./main.js

WORKDIR /vite-app
RUN yarn build

FROM node:lts-alpine as serve

WORKDIR /server
RUN yarn global add serve

COPY --from=build /vite-app/dist /server/dist

EXPOSE 3000
CMD ["serve", "./dist"]
