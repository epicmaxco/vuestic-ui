<template>
  <div>
    <component
      v-for="(block, i) in blocks"
      :key="i" 
      :is="block.component" v-bind="block.attributes" 
    />
  </div>
</template>

<script setup lang="ts">
import * as views from './blocks'

const { currentRoute } = useRouter()

const configName = 'ui-elements/button'

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
      component: views[block.component],
      attributes: block.setup?.()
    }))
})
</script>