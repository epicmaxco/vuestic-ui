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
  <h3>
    {{ t(text) }}
    <Anchor :text="text"/>
  </h3>
</template>
