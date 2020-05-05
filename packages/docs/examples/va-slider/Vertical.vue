<template>
  <div>
    <va-slider v-model="value" vertical/>
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
