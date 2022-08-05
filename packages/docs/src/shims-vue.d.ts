/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<any, any, any>
  export default component
}

declare module '*.md'

declare module 'vuestic' {
  export * from 'vuestic-ui/src/main'
}
