FROM node:17-alpine as build

RUN yarn create vite vite-app --template vue
WORKDIR /vite-app
RUN yarn add vuestic-ui

COPY ./templates ./src

RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /vite-app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]