import { addImports, addComponent } from '@nuxt/kit';

export const useRuntime = () => {
  addComponent({
    name: 'PageConfig',
    filePath: '~/modules/page-config/runtime/PageConfig.vue',
  })
  addComponent({
    name: 'MarkdownView',
    filePath: '~/modules/page-config/blocks/shared/markdown/MarkdownView.vue',
  })
  addComponent({
    name: 'CodeView',
    filePath: '~/modules/page-config/blocks/shared/code/CodeView.vue',
  })
  addImports({
    name: 'defineManualApi',
    from: '~/modules/page-config/runtime/index.ts'
  })
  addImports({
    name: 'usePageConfig',
    from: '~/modules/page-config/runtime/usePageConfig.ts'
  })
  addImports({
    name: 'usePageConfigs',
    from: '~/modules/page-config/runtime/usePageConfig.ts'
  })
}
