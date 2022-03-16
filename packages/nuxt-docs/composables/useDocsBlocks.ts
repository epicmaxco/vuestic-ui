import type { TranslationString } from "~/types/translations"
import type { ExtractPropTypes } from '~/types/extract-component-props'
import type { CodesandboxConfig } from "~~/components/docs/blocks/DocsExample/DocsNavigation/CodeSandboxExample"
import { BlockComponents } from '~~/components/docs/blocks'
import { TableColumn, TableData } from "~~/components/docs/blocks/DocsTable/DocsTableTypes"

export type ExampleOptions = {
  hideCode?: boolean,
  forceShowCode?: boolean
  codesandboxConfig?: CodesandboxConfig
}

type BlockComponentName = keyof BlockComponents

type DocsBlock<T extends keyof BlockComponents> = {
  component: T,
  setup: () => ExtractPropTypes<BlockComponents[T]>
}

const defineBlock = <Component extends BlockComponentName>(block: DocsBlock<Component>) => {
  return block
}

/** Use `import.meta` as path parametr */
export const useDocsBlocks = (meta: ImportMeta) => {
  let path = meta.url
    .replace('/index.ts', '')
    .replace(/.*page\-configs\//g, '')

  // Return `defineBlock` to get better IDE support
  return {
    title: (translationString: TranslationString) => defineBlock({
      component: 'MarkdownView',
      setup: () => {
        const { tie } = useI18n()

        return {
          source: `# ${tie(translationString)}`  
        }
      }
    }),
    subtitle: (translationString: TranslationString, tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h3') => defineBlock({
      component: 'DocsHeadline',
      setup: () => {
        const { tie } = useI18n()

        return {
          source: `${tie(translationString)}`,
          anchor: translationString,
          tag
        }
      }
    }),
    code: (code: string, language = 'javascript') => defineBlock({
      component: 'DocsCode',
      setup: () => ({ code, language })
    }),
    example: (exampleComponentName: string, exampleOptions: ExampleOptions = {}) => defineBlock({
      component: 'DocsExample',
      setup: () => ({ component: exampleComponentName, exampleOptions, path })
    }),
    table: (columns: TableColumn[], tableData: TableData) => defineBlock({
      component: 'DocsTable',
      setup: () => ({ tableData, columns })
    }),
    /** @notice Make sure to import component without `withTransportConfig`. */
    api: (component: any) => defineBlock({
      component: 'DocsComponentApi',
      setup: () => {
        const { getConfig } = usePageConfig()

        const { manualApi } = getConfig(path)

        return { component, apiOptions: manualApi }
      }
    }),
  }
}