<template>
  <div>
    <va-rating
      icon="heart"
      empty-icon="heart_empty"
      v-model="value"
    />
    <va-rating
      icon="thumb_up"
      empty-icon="thumb_up_empty"
      v-model="value"
    />
    <va-rating
      icon="battery"
      empty-icon="battery_empty"
      half-icon="battery_half"
      halves
      hover
      v-model="value"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: 3,
    }
  },
}
</script>
