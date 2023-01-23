<script setup lang="ts">
import { Anchor } from '../shared/anchor'

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const { t } = useI18n()
</script>

<template>
  <h4 class="page-config-headline">
    {{ t(text)  }}
    <Anchor :text="text" />
  </h4>
</template>
