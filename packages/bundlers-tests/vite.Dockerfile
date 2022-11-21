FROM local-vuestic:latest as build

RUN yarn create vite vite-app --template vue
WORKDIR /vite-app

RUN yarn add file:/local-vuestic

COPY /bundlers-tests/templates/src ./src

RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /vite-app/dist /usr/share/nginx/html
COPY /bundlers-tests/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]