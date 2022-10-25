<template>
  <div
    class="color-grid__item"
    :style="{ backgroundColor: value, color: textColorComputed }"
  >
    <p>
      {{ name }}
    </p>
    <p style="font-size: 14px;">
      var(--va-{{ name }})
    </p>
    {{ value }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useElementBackground, useTextColor } from 'vuestic-ui/src/composables'

const { background } = useElementBackground()
const { textColorComputed } = useTextColor(background)

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
})
</script>
