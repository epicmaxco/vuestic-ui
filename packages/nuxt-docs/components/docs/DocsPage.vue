<template>
  <div>
    <component
      v-for="(block, i) in blocks"
      :key="i + currentRoute.fullPath"
      :is="block.component" v-bind="block.attributes"
    />
  </div>
</template>

<script setup lang="ts">
import { blockComponents } from './blocks'

const { currentRoute } = useRouter()

const { getConfig } = usePageConfig()

const config = computed(() => {
  const { name, page } = currentRoute.value.params
  // TODO: Rename page params
  const configPath = `${name}/${page}`

  return getConfig(configPath)
})

const blocks = computed(() => {
  if (!config.value) return []

  return config.value.blocks
    .map((block) => ({
      // TODO: Add here uuid
      component: blockComponents[block.component],
      attributes: block.setup?.()
    }))
})
</script>
