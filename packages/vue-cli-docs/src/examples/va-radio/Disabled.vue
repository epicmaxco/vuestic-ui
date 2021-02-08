<template>
  <div>
    <va-radio
      v-for="(option, index) in options"
      :key="index"
      v-model="selectedOption"
      :option="option"
      disabled
    />
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
