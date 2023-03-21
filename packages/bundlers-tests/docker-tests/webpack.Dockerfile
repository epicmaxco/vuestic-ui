FROM local-packages-lts:latest as build

RUN yarn global add @vue/cli

COPY /templates/configs/vuerc.json /vuerc.json
RUN vue create --preset /vuerc.json app-webpack

WORKDIR /app-webpack

COPY /templates/src src
COPY /templates/configs/shims-vue.d.ts src/shims-vue.d.ts
COPY /templates/configs/main-base.js src/main.ts

RUN yarn add vuestic-ui@file:/local-vuestic
RUN yarn add material-design-icons-iconfont -D

RUN yarn build

FROM node:lts-alpine as serve

WORKDIR /server
RUN yarn global add serve

COPY --from=build /app-webpack/dist /server/dist

EXPOSE 3000
CMD ["serve", "./dist"]
