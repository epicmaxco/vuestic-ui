FROM local-packages:latest as build

RUN yarn create vite vite-app --template vue

WORKDIR /vite-app
RUN yarn add vuestic-ui@file:/local-vuestic
RUN yarn add material-design-icons-iconfont -D

WORKDIR /vite-app/src
COPY ./../templates/src .

WORKDIR /vite-app
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /vite-app/dist /usr/share/nginx/html
COPY ./../templates/configs/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
