import { DocsBlock, DocsBlockType, TranslationString } from "~/types/docs-blocks"
import { CodesandboxConfig } from "~~/components/docs/blocks/DocsExample/DocsNavigation/CodeSandboxExample"

export type ExampleOptions = {
  hideCode?: boolean,
  forceShowCode?: boolean
  codesandboxConfig?: CodesandboxConfig
}

/** Use `import.meta` as path parametr */
export const useDocsBlocks = (meta: ImportMeta = import.meta) => {
  let path = meta.url
    .replace('/index.ts', '')
    .replace(/.*page\-configs\//g, '')

  return {
    title: (translationString: TranslationString): DocsBlock => ({
      type: DocsBlockType.TITLE,
      component: 'MarkdownView',
      setup: () => {
        const { tie } = useI18n()

        return {
          source: `# ${tie(translationString)}`  
        }
      }
    }),
    subtitle: (translationString: TranslationString): DocsBlock => ({
      type: DocsBlockType.SUBTITLE,
      component: 'MarkdownView',
      setup: () => {
        const { tie } = useI18n()

        return {
          source: `## ${tie(translationString)}`  
        }
      }
    }),
    example: (component: string, exampleOptions: ExampleOptions = {}): DocsBlock => ({
      type: DocsBlockType.EXAMPLE,
      component: 'DocsExample',
      setup: () => {
        return {
          path,
          component,
          exampleOptions,
        }
      }
    })
  }
}