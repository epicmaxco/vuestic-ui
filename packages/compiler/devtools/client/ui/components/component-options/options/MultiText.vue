<script lang="ts" setup>
import { computed } from 'vue'
import { VaInput } from 'vuestic-ui'

const props = defineProps<{
  label: string
}>()
const vModel = defineModel<string | null>()

// TODO: Make as tag input
// const vModelProxy = computed({
//   get() { return vModel.value?.join(', ') ?? '' },
//   set(value: string) { vModel.value = value.split(', ') }
// })
</script>

<template>
  <VaInput
    :label="props.label"
    v-model="vModel"
  />
</template>
