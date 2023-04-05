<template>
  <va-slider
    v-model="value[0]"
    class="mb-6"
    track-label-visible
  />

  <va-slider
    v-model="value[1]"
    class="mb-6"
    track-label-visible
  >
    <template #trackLabel="{ value }">
      <va-chip
        color="warning"
        size="small"
      >
        {{ value }}
      </va-chip>
    </template>
  </va-slider>

  <va-slider
    v-model="value"
    class="mb-6"
    range
    track-label-visible
    :track-label="processTrackLabel"
  />

  <va-slider
    v-model="value"
    range
    track-label-visible
  >
    <template #trackLabel="{ value, order }">
      <va-chip
        size="small"
        :color="order === 0 ? 'success' : 'danger'"
      >
        {{ value }}
      </va-chip>
    </template>
  </va-slider>
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
