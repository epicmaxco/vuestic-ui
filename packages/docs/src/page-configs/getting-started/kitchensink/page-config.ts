import { ApiDocsBlock, BlockType } from '@/types/configTypes'
import { shallowReactive } from 'vue'

const importedConfigsContext = require.context(
  '@/page-configs/ui-elements/',
  true,
  /page-config.ts$/,
  'lazy',
)

export const config = shallowReactive<ApiDocsBlock[]>([])

importedConfigsContext.keys().forEach(async (filename) => {
  let importedConfig = null
  try {
    importedConfig = (await importedConfigsContext(filename)).default
  } catch {
    return
  }

  config.push({ ...importedConfig[0], type: BlockType.SUBTITLE }) // title

  const example =
    importedConfig.find(
      (blockElement: any) =>
        blockElement.type === BlockType.EXAMPLE &&
        blockElement.component === 'Default',
    ) ||
    importedConfig.find(
      (blockElement: any) => blockElement.type === BlockType.EXAMPLE,
    )

  if (example) {
    config.push(example)
  }
})
