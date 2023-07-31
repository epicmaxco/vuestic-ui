declare module '#app' {
  export * from 'nuxt/app'
}

declare module '#app/components/nuxt-link' {
  export * from 'nuxt/dist/app/components/nuxt-link.ts'
  export { default as default } from 'nuxt/dist/app/components/nuxt-link.ts'
}

declare module '#imports' {
  export * from '@unhead/vue'
}
