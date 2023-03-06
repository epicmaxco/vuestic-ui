#TODO replace cli by create vuestic

FROM local-packages-lts:latest as build

RUN yarn global add @vue/cli

COPY ./../templates/configs/vuerc.json /vuerc.json
RUN vue create --preset /vuerc.json cli-app

WORKDIR /cli-app
RUN yarn add file:/local-cli
RUN yarn add material-design-icons-iconfont -D
RUN yarn add vuestic-ui@file:/local-vuestic

RUN vue invoke vuestic-ui --default

WORKDIR /cli-app/src
COPY ./../templates/src/custom-components /custom-components
COPY ./../templates/src/App.vue /App.vue
COPY ./../templates/src/kitchensink.vue /kitchensink.vue

WORKDIR /cli-app
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /cli-app/dist /usr/share/nginx/html
COPY ./../templates/configs/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
