declare module '#app' {
  export * from 'nuxt/app'
}

// Path to vuestic-ui main, so it is not required to build vuestic before working with packages/nuxt
declare module 'vuestci-ui' {
  export * from 'vuestic-ui/src/main'
}