<template>
  {{ header }}
  <div style="color: blue;">
    <slot name="blue" />
  </div>

  <div style="color: rgb(186, 186, 33);">
    <slot name="yellow" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    header: { type: String, required: true },
  },
})
</script>
