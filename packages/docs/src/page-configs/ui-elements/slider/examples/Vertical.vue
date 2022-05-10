<template>
  <div class="row justify--center" style="height: 200px;">
    <va-slider class="mr-5" v-model="value" vertical track-label-visible />
    <va-slider class="mr-5" v-model="value" vertical track-label-visible pins :step="5" />
    <va-slider class="mr-5"
      v-model="rangeValue"
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
        >{{ value }}</va-chip>
      </template>
    </va-slider>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 45,
      rangeValue: [45, 65],
    }
  },
}
</script>
