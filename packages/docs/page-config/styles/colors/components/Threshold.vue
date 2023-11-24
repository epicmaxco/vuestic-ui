<script setup lang="ts">
  const threshold = ref(170)
  const customColor = ref('#666E75')
</script>

<template>
  <VaConfig
    :colors="{
      threshold,
      variables: {
        customColor,
      },
    }"
  >
    <div class="flex gap-2 mb-2 flex-wrap sm:flex-nowrap">
      <div class="w-full sm:w-1/3 py-2 px-3 h-14 rounded-md" :style="{ background: 'var(--va-primary)', color: 'var(--va-on-primary)' }">
        Primary
      </div>
      <div class="w-full sm:w-1/3 py-2 px-3 rounded-md" :style="{ background: 'var(--va-warning)', color: 'var(--va-on-warning)' }">
        Warning
      </div>
      <div class="w-full sm:w-1/3 py-2 px-3 rounded-md" :style="{ background: 'var(--va-success)', color: 'var(--va-on-success)' }">
        Success
      </div>
    </div>
    <div>
      <div class="py-2 px-3 rounded-md flex gap-4 items-center" :style="{ background: 'var(--va-custom-color)', color: 'var(--va-on-custom-color)' }">
        CustomColor
        <VaColorInput v-model="customColor" />
      </div>
    </div>
  </VaConfig>
  <VaSlider
    v-model="threshold"
    label="threshold"
    :max="255"
    :min="0"
    class="my-4"
  >
    <template #append>
      <VaCounter
        v-model.number="threshold"
        class="w-[140px]"
        type="number"
      />
    </template>
  </VaSlider>
</template>
