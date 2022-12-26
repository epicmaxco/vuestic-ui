FROM local-nuxt:latest as build

RUN npx nuxi init nuxt-app

WORKDIR /nuxt-app

RUN yarn add file:/local-nuxt
RUN yarn add material-design-icons-iconfont -D

COPY ./../templates/src/App.vue ./app.vue
COPY ./../templates/src/components ./components
COPY ./../templates/src/kitchensink.vue ./kitchensink.vue
COPY ./../templates/configs/nuxt.config.ts .

RUN yarn build

EXPOSE 3000
ENTRYPOINT ["node", ".output/server/index.mjs"]