<script setup lang="ts">
import { ref } from "vue";

const palette = ["#2c82e0", "#ef476f", "#ffd166", "#06d6a0", "#8338ec"];

const primaryColor = ref(palette[0]);
</script>

<template>
  <VaNavbar color="primary">
    <template #left>Logo</template>
    <template #right>
      <div class="flex items-center gap-3">
        Primary color:
        <VaColorPalette v-model="primaryColor" :palette="palette" />
      </div>
    </template>
  </VaNavbar>
  <div class="mt-2">
    <VaConfig
      :colors="{
        variables: {
          primary: primaryColor,
        },
      }"
    >
      <div class="mb-2">
        <VaAvatar>M.N.</VaAvatar>
        Maksim N.
      </div>
      <VaButton>Play</VaButton>
      <VaButton preset="secondary">Follow</VaButton>
    </VaConfig>
  </div>
</template>
