<template>
  <va-radio
    v-for="(option, index) in options"
    :key="index"
    v-model="selectedOption"
    :option="option"
  />
  <div>
    Selected: {{ selectedOption }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [
        'one',
        'two',
        'three',
      ],
      selectedOption: 'one',
    }
  },
}
</script>
