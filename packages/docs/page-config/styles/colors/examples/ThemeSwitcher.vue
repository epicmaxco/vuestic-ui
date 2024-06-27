<script setup lang="ts">
import { computed } from 'vue';
import { useColors } from "vuestic-ui";

const { applyPreset, currentPresetName, colors } = useColors();

const palette = ["#2c82e0", "#ef476f", "#ffd166", "#06d6a0", "#8338ec"];

const switchValue = computed({
  get() { return currentPresetName.value },
  set(value) { applyPreset(value) }
})
</script>
<template>
  <div>
    <div class="flex items-center gap-3">
      Primary color:
      <VaColorPalette v-model="colors.primary" :palette="palette" />
    </div>

    <div class="flex items-center gap-3">
      Dark mode:
      <VaSwitch v-model="switchValue" true-value="dark" false-value="light" size="small" />
    </div>
  </div>
</template>
