<template>
  <button @click="onClick" style="padding: 20px">{{ counter }}</button>
</template>

<script>
export default {
  name: 'TestButton',
  data () {
    return {
      counter: 0,
    }
  },
  methods: {
    onClick () {
      this.counter++
    },
  },
}
</script>

<style scoped>

</style>
