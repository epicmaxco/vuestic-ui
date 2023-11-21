<template>
  <div
    class="flex flex-wrap justify-center h-48"
  >
    <VaSlider
      v-model="value"
      class="mr-8"
      vertical
      track-label-visible
    />
    <VaSlider
      v-model="value"
      class="mr-8"
      vertical
      track-label-visible
      pins
      :step="5"
    />
    <VaSlider
      v-model="rangeValue"
      class="mr-8"
      vertical
      range
      pins
      :step="5"
      track-label-visible
    >
      <template #trackLabel="{ value, order }">
        <VaChip
          size="small"
          :color="order === 0 ? 'success' : 'danger'"
        >
          {{ value }}
        </VaChip>
      </template>
    </VaSlider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 45,
      rangeValue: [45, 65],
    };
  },
};
</script>
