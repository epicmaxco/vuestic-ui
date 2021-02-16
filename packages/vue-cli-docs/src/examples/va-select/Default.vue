<template>
  <div style="max-width: 300px;">
    <va-select v-model="value" :options="options" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      options: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
    }
  },
}
</script>
