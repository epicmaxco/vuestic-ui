<template>
  <div>
    <docs-content :config="config" />
  </div>
</template>

<script lang="ts" setup>
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { ApiDocsBlock, BlockType } from '@/types/configTypes'
import DocsContent from '@/components/DocsContent.vue'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = []
const importedConfigs = require.context('@/page-configs/ui-elements/', true, /page-config.ts$/)
importedConfigs.keys().forEach(filename => {
  const importedConfig = importedConfigs(filename).default

  config.push({ ...importedConfig[0], type: BlockType.SUBTITLE }) // title
  const defaultExample = importedConfig.find((blockElement: any) => {
    return blockElement.type === BlockType.EXAMPLE && blockElement.component === 'Default'
  })

  if (defaultExample) {
    config.push(defaultExample)
  } else {
    // const name = filename.match(/^\.\/(.+)\/page-config.ts$/)?.[1]
    // throw new Error(`Don't have default example in ${name}`)
  }
})
</script>
