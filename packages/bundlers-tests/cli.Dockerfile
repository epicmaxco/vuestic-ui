FROM local-vuestic:latest as build

RUN yarn global add @vue/cli
COPY /templates/configs/vuerc.json /vuerc.json
RUN vue create --preset /vuerc.json app

WORKDIR /app
RUN yarn add vuestic-ui@file:/local-vuestic
RUN yarn add material-design-icons-iconfont -D

COPY /templates/src ./src

WORKDIR /app
RUN yarn
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
