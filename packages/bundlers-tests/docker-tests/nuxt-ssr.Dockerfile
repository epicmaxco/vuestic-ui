FROM local-packages-lts:latest as build

RUN npx nuxi init nuxt-app

WORKDIR /nuxt-app

RUN yarn add @vuestic/nuxt@file:/local-nuxt
RUN yarn add sass
RUN yarn add vuestic-ui@file:/local-vuestic
RUN yarn add material-design-icons-iconfont -D

COPY /templates/src .
COPY /templates/configs/nuxt-ssr.config.ts ./nuxt.config.ts

RUN yarn build

EXPOSE 3000
ENTRYPOINT ["node", ".output/server/index.mjs"]
