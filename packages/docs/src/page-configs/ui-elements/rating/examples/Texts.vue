<template>
  <va-rating
    v-model="value"
    text-color="danger"
    :texts="[
      'Bad',
      'Quite bad',
      'Normal',
      'Not bad',
      'Good'
    ]"
  />
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
