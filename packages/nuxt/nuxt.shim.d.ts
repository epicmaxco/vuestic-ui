declare module '#app' {
  export * from 'nuxt/app'
}

declare module '#app/components/nuxt-link' {
  export * from 'nuxt/dist/app/components/nuxt-link.ts'
  export { default as default } from 'nuxt/dist/app/components/nuxt-link.ts'
}

// Path to vuestic-ui main, so it is not required to build vuestic before working with packages/nuxt
declare module 'vuestci-ui' {
  export * from 'vuestic-ui/src/main'
}

declare module '#imports' {
  export * from '@unhead/vue'
  export { defineNuxtPlugin, useCookie } from 'nuxt/app'
}

declare module '#vuestic-config' {
  import { GlobalConfig } from 'vuestic-ui'
  var gc: GlobalConfig | undefined
  export default gc
}
