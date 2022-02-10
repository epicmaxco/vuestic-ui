<template>
  <div>
    <va-slider class="mb-3"
      v-model="value[0]"
      track-label-visible
    />

    <va-slider class="mb-3"
      v-model="value[1]"
      track-label-visible
      :track-label="`${value[1]}%`"
    />

    <va-slider class="mb-3 mt-4"
      v-model="value[1]"
      track-label-visible
    >
      <template #trackLabel="{ value }">
        <va-chip color="warning" size="small">{{ value }}</va-chip>
      </template>
    </va-slider>

    <va-slider class="mb-3"
      v-model="value"
      range
      track-label-visible
      :track-label="[`>${value[0]}%`, `<${value[1]}%`]"
    />

    <va-slider class="mb-3"
      v-model="value"
      range
      track-label-visible
      :track-label="processTrackLabel"
    />

    <va-slider class="mt-4"
      v-model="value"
      range
      track-label-visible
    >
      <template #trackLabel="{ value, order }">
        <va-chip
          size="small"
          :color="order === 0 ? 'success' : 'danger'"
        >{{ value }}</va-chip>
      </template>
    </va-slider>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: [45, 65],
    }
  },
  methods: {
    processTrackLabel (value) {
      return value === this.value[0]
        ? `min ${value}`
        : `max ${value}`
    },
  },
}
</script>
