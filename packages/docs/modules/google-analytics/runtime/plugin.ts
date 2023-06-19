import { defineNuxtPlugin } from '#app';
import VueGtag from 'vue-gtag'

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.use(VueGtag, {
    config: { id: "<%= options.ID %>" }
  })
})
