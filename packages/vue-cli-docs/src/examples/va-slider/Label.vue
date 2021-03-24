<template>
  <div>
    <va-slider label="label" v-model="value1" />
    <va-slider label="inverted" invert-label v-model="value2" />
    <va-slider label="danger" label-color="danger" v-model="value3" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: 37,
      value2: 73,
      value3: 53,
    }
  },
}
</script>
