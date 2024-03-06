<template>
  <VaButtonToggle
    v-model="config"
    :options="[
      {
        label: 'Outline',
        value: {
          VaButton: { preset: 'secondary' },
        },
      },
      {
        label: 'Solid',
        value: {
          VaInput: { preset: 'solid' },
          VaSelect: { preset: 'solid' },
        },
      },
    ]"
    class="mb-4"
  />

  <VaConfig :components="config">
    <VaCard>
      <VaCardTitle>My Card</VaCardTitle>
      <VaCardContent class="flex gap-2 flex-col">
        <VaInput label="Login" />
        <VaInput label="Password" />
        <VaSelect :options="['one', 'two', 'three']" label="Country" />
      </VaCardContent>
      <VaCardActions align="right">
        <VaButton>My Button</VaButton>
      </VaCardActions>
    </VaCard>
  </VaConfig>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const config = ref();
</script>
