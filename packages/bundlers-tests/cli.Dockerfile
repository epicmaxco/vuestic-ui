FROM local-vuestic:latest as build

RUN yarn global add @vue/cli
RUN vue create app --default

WORKDIR /app
RUN yarn add file:/local-vuestic

WORKDIR /app/src
COPY /templates/src .

RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]