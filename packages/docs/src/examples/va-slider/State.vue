<template>
  <div>
    <va-slider label="Disabled" v-model="value1" disabled />
    <va-slider label="Readonly" v-model="value2" readonly />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: 33,
      value2: 66,
    }
  },
}
</script>
