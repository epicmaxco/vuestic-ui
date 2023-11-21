<template>
  <VaSlider
    v-model="value[0]"
    class="mb-6"
    track-label-visible
  />

  <VaSlider
    v-model="value[1]"
    class="mb-6"
    track-label-visible
  >
    <template #trackLabel="{ value }">
      <VaChip
        color="warning"
        size="small"
      >
        {{ value }}
      </VaChip>
    </template>
  </VaSlider>

  <VaSlider
    v-model="value"
    class="mb-6"
    range
    track-label-visible
    :track-label="processTrackLabel"
  />

  <VaSlider
    v-model="value"
    range
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
</template>

<script>
export default {
  data() {
    return {
      value: [45, 65],
    };
  },
  methods: {
    processTrackLabel(value, order) {
      return order === 0 ? `min ${value}$` : `max ${value}$`;
    },
  },
};
</script>
