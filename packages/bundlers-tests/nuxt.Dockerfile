FROM node:18-alpine as build

RUN npx nuxi init nuxt-app
WORKDIR /nuxt-app
RUN yarn add @vuestic/nuxt

COPY templates/src/App.vue ./app.vue
COPY templates/configs/nuxt.config.ts .

RUN yarn build

EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]