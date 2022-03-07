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

const configName = 'test'

const { getConfigAsync } = usePageConfig()

const config = getConfigAsync(configName)

const blocks = config
  .map((block) => ({
    component: views[block.component],
    attributes: block.setup?.()
  }))
</script>