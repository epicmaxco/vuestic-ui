FROM node:17-alpine as build

WORKDIR /local-vuestic
COPY /ui .
RUN yarn link

WORKDIR /
RUN yarn create vite vite-app --template vue
WORKDIR /vite-app
RUN yarn add vuestic-ui
RUN yarn link vuestic-ui

COPY /bundlers-tests/templates/src ./src

RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /vite-app/dist /usr/share/nginx/html
COPY /bundlers-tests/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]