// @ts-ignore // TODO: mimic #app module
import { defineNuxtPlugin } from '#app'

// @replace-next-line: import { createLibraryPlugin } from 'my-cool-library'
import { createLibraryPlugin } from '../../main'
// @replace-next-line: import 'my-cool-library'

export default defineNuxtPlugin((nuxtApp: any) => {
  nuxtApp.vueApp.use(createLibraryPlugin())
})
