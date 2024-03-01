<template>
  <VaConfig :colors="{ variables: { primary: color }, currentPresetName: presetName }">
    <VaCard>
      <VaCardContent class="flex flex-col gap-2">
        <VaColorInput v-model="color" />
        <VaButton @click="presetName === 'light' ? presetName = 'dark' : presetName = 'light'">
          Toggle theme
        </VaButton>
        <VaInput label="login" />
        <VaInput label="password" type="password" />
        <div class="flex gap-2">
          <VaButton>login</VaButton>
          <VaButton color="secondary">
            register
          </VaButton>
        </div>        
      </VaCardContent>
    </VaCard>
  </VaConfig>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const color = ref('#f0f')
  const presetName = ref('light')
</script>