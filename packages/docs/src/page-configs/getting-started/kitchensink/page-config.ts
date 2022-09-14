import { ApiDocsBlock, BlockType, isTextBlock } from '@/types/configTypes'
import { shallowReactive } from 'vue'

const importedConfigsContext = require.context(
  '@/page-configs/ui-elements/',
  true,
  /page-config.ts$/,
  'lazy',
)

export const config = shallowReactive<ApiDocsBlock[]>([])

importedConfigsContext.keys().forEach(async (filename) => {
  let importedConfig: ApiDocsBlock[] | null = null
  importedConfig = (await importedConfigsContext(filename))?.default

  if (!importedConfig) {
    return
  }

  const titleBlock = importedConfig.find(configBlock => configBlock.type === BlockType.TITLE)
  const example =
    importedConfig.find(
      (blockElement: any) =>
        blockElement.type === BlockType.EXAMPLE &&
        blockElement.component === 'Default',
    )

  if (!example || !titleBlock || !isTextBlock(titleBlock)) {
    return
  }

  config.push({ ...titleBlock, type: BlockType.SUBTITLE })
  config.push(example)
})
