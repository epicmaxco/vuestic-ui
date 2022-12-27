FROM local-packages:latest as build

RUN yarn global add @vue/cli
COPY ./../templates/configs/vuerc.json /vuerc.json
RUN vue create --preset /vuerc.json app

WORKDIR /app
RUN yarn add file:/local-cli
RUN vue invoke vuestic-ui --default
RUN yarn add vuestic-ui@file:/local-vuestic
RUN yarn add material-design-icons-iconfont -D

WORKDIR /app/src
COPY ./../templates/src/custom-components /custom-components
COPY ./../templates/src/App.vue /App.vue
COPY ./../templates/src/kitchensink.vue /kitchensink.vue

RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./../nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]