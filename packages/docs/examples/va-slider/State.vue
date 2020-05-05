<template>
  <div>
    Disabled <va-slider v-model="value1" disabled/>
    Readonly <va-slider v-model="value2" readonly/>
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
