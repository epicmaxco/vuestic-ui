import { addImports, addComponent } from '@nuxt/kit';

export const useRuntime = () => {
  // addImports({
  //   name: 'block',
  //   from: '@/modules/page-config/runtime',
  // })
  // addImports({
  //   name: 'definePageConfig',
  //   from: '@/modules/page-config/runtime',
  // })
  addComponent({
    name: 'PageConfig',
    filePath: '@/modules/page-config/runtime/PageConfig.vue',
  })
}
