<template>
  <div>
    <va-slider v-model="length" :max="15" style="width: 50%;" />
    <va-rating v-model="value" :max="length" numbers />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 3,
      length: 5,
    }
  },
}
</script>
