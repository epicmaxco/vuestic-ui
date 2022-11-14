FROM node:17-alpine as build

RUN yarn global add @vue/cli
RUN vue create cli-app --default
WORKDIR /cli-app
RUN yarn add vuestic-ui

COPY ./templates/src ./src

RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /cli-app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]