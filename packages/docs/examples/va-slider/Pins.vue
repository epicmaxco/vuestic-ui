<template>
  <div>
    <va-slider v-model="value" pins/>
  </div>
</template>

<script>export default {
  data () {
    return {
      value: 45,
    }
  },
}
</script>
