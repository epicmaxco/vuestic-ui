FROM node:17-alpine as build

RUN mkdir -p /usr/vite-app
WORKDIR /usr/vite-app
RUN yarn create vite app --template vue
WORKDIR ./app
RUN yarn
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /usr/vite-app/app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]