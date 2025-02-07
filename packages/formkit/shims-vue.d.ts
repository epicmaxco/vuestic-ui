declare module '*.vue' {
  import { DefineComponent } from '@vue/runtime-core'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'vuestic-ui';
