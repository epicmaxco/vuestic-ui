import {
  ApiDocsBlock,
  BlockType,
  isExampleBlock,
  isTextBlock,
} from '@/types/configTypes'
import { shallowReactive } from 'vue'

const importedConfigsContext = require.context(
  '@/page-configs/ui-elements/',
  true,
  /page-config.ts$/,
  'lazy',
)
const EXCLUDED_COMPONENTS: string[] = ['backtop.title']
const isNeedToExcludeComponent = (titleTranslationString: string) =>
  EXCLUDED_COMPONENTS.includes(titleTranslationString)

export const config = shallowReactive<ApiDocsBlock[]>([])

importedConfigsContext.keys().forEach(async (filename) => {
  let importedConfig: ApiDocsBlock[] | null = null
  importedConfig = (await importedConfigsContext(filename))?.default

  if (!importedConfig) {
    return
  }

  const titleBlock = importedConfig.find(
    (configBlock) => configBlock.type === BlockType.TITLE,
  )
  const example = importedConfig.find(
    (blockElement) =>
      blockElement.type === BlockType.EXAMPLE &&
      blockElement.component === 'Default',
  )

  if (
    !example ||
    !titleBlock ||
    !isTextBlock(titleBlock) ||
    !isExampleBlock(example) ||
    isNeedToExcludeComponent(titleBlock.translationString)
  ) {
    return
  }

  config.push({ ...titleBlock, type: BlockType.SUBTITLE })
  config.push({
    ...example,
    exampleOptions: {
      hideCode: true,
    },
  })
})
