import { DocsBlock, DocsBlockType, TranslationString } from "~/types/docs-blocks"

export const useDocsBlocks = (path?: string) => {
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
    })
  }
}