<template>
  <div class="flex items-center p-2" :style="{ 
    background: getGradientBackground(getColor('warning')),
    color: shiftHSLAColor(getColor(getTextColor(getColor('warning'))), { a: -0.5 }),
   }">
    Accent gradient
  </div>
</template>

<script setup lang="ts">
import { useColors } from "vuestic-ui";

const { shiftHSLAColor, getGradientBackground, getTextColor, getColor } = useColors()
</script>