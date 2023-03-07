<script setup lang="ts">
import { MarkdownView } from '../shared/markdown';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'info'
  },
  solid: {
    type: Boolean,
    default: false,
  }
})

const { t } = useI18n()
</script>

<template>
  <va-alert
    class="page-config-alert my-2"
    :color="color"
    :outline="!solid"
  >
    <MarkdownView :content="t(text)" />
  </va-alert>
</template>

<style lang="scss">
.page-config-alert {
  p {
    margin: 0;
  }
}
</style>
