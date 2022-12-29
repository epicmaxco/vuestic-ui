FROM local-packages:latest as build

RUN yarn global add @vue/cli

COPY ./../templates/configs/vuerc.json /vuerc.json
RUN vue create --preset /vuerc.json app-webpack

WORKDIR /app-webpack
RUN yarn add vuestic-ui@file:/local-vuestic
RUN yarn add material-design-icons-iconfont -D

WORKDIR /app-webpack/src
COPY ./../templates/src .
COPY ./../templates/configs/main-base.js ./main.js

WORKDIR /app-webpack
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /app-webpack/dist /usr/share/nginx/html
COPY ./../templates/configs/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]