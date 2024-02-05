<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
  tags: {
    type: Array as PropType<string[]>,
    required: true
  }
})

</script>

<template>
  <div class="flex mt-2 mb-4">
    <VaChip
      v-for="tag in tags"
      :key="tag"
      color="background-element"
      class="mr-2"
      size="small"
    >
      {{ tag }}
    </VaChip>
  </div>
</template>
