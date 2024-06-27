<template>
  <div class="flex items-center gap-4">
    <VaButton>Primary button</VaButton>

    <VaColorPalette
      v-model="primaryColor"
      :palette="colorsToChange"
      class="mx-6"
    />

    <span>{{ currentColorText }} {{ primaryColor }}</span>
  </div>
</template>

<script setup>
import { useColors } from 'vuestic-ui';

const { getComputedColor } = useColors();

const colorsToChange = [
  "#2c82e0",
  "#ef476f",
  "#ffd166",
  "#06d6a0",
  "#118ab2",
];

const primaryColor = getComputedColor('primary');
</script>
