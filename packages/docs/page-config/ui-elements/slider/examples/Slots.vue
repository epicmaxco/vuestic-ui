<template>
  <VaSlider v-model="value1">
    <template #prepend>
      <VaCounter
        v-model="value1"
        :min="0"
        :max="100"
        class="w-[110px]"
      />
    </template>
  </VaSlider>
  <VaSlider v-model="value2">
    <template #append>
      <VaCounter
        v-model="value2"
        :min="0"
        :max="100"
        class="w-[110px]"
      />
    </template>
  </VaSlider>
  <VaSlider v-model="value3">
    <template #label>
      <div class="italic text-black">
        LABEL SLOT
      </div>
    </template>
  </VaSlider>
</template>

<script>
export default {
  data() {
    return {
      value1: 45,
      value2: 45,
      value3: 45,
    };
  },
};
</script>
