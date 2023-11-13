import { defineNuxtPlugin } from '#imports';
import VueGtag from 'vue-gtag'

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.use(VueGtag, {
    config: { id: "<%= options.ID %>" }
  })
})
