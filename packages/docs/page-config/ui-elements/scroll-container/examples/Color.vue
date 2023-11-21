<template>
  <VaScrollContainer
    class="max-h-[200px]"
    :color="currentColor"
    vertical
  >
    <VaList>
      <VaListItem
        v-for="color in colorsArray"
        :key="color.name"
        class="flex cursor-pointer"
        @click="currentColor = color.name"
      >
        <VaColorIndicator
          class="mr-2"
          :color="color.name"
        />
        {{ color.title }}
      </VaListItem>
    </VaList>
  </VaScrollContainer>
</template>

<script setup>
import { ref, computed } from "vue";

import { presets } from "vuestic-ui/src/services/color/presets";

const currentColor = ref("primary");

const capitalizeFirstLetter = (text) =>
  text.charAt(0).toUpperCase() + text.slice(1);

const colorsArray = computed(() => {
  return Object.keys(presets.light).reduce((acc, color) => {
    !color.includes("background") &&
      acc.push({ name: color, title: capitalizeFirstLetter(color) });
    return acc;
  }, []);
});
</script>
