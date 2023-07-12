declare module '#app' {
  export * from 'nuxt/app'
}

declare module '#app/components/nuxt-link' {
  export * from 'nuxt/dist/app/components/nuxt-link.ts'
  export { default } from 'nuxt/dist/app/components/nuxt-link.ts'
}

// Path to vuestic-ui main, so it is not required to build vuestic before working with packages/nuxt
declare module 'vuestci-ui' {
  export * from '../main'
}

declare module '#imports' {
  export * from '@unhead/vue'
}

declare module '#vuestic-config' {
  import { GlobalConfig } from 'vuestic-ui'
  const gc: GlobalConfig | undefined
  export default gc
}
