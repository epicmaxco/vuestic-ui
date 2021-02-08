<template>
  <div>
    <va-slider v-model="value" :step="5"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 45,
    }
  },
}
</script>
