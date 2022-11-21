FROM local-vuestic:latest as build

RUN npx nuxi init nuxt-app
WORKDIR /nuxt-app
RUN yarn add @vuestic/nuxt
RUN yarn add file:/local-vuestic

COPY templates/src/App.vue ./app.vue
COPY templates/configs/nuxt.config.ts .

RUN yarn build

EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]