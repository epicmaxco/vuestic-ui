// @ts-ignore // TODO: mimic #app module
import { defineNuxtPlugin } from '#app'
import { createLibraryPlugin } from 'my-cool-library'

export default defineNuxtPlugin((nuxtApp: any) => {
  nuxtApp.vueApp.use(createLibraryPlugin())
})
