<template>
  <div
    class="flex flex-wrap justify-center"
    style="height: 200px;"
  >
    <va-slider
      v-model="value"
      class="mr-8"
      vertical
      track-label-visible
    />
    <va-slider
      v-model="value"
      class="mr-8"
      vertical
      track-label-visible
      pins
      :step="5"
    />
    <va-slider
      v-model="rangeValue"
      class="mr-8"
      vertical
      range
      pins
      :step="5"
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
