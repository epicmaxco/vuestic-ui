<template>
  <div class="va-input-css-example">
    <va-input
      class="mb-3"
      input-class="text-right red"
      model-value="This input must have right-aligned red text."
    />
    <va-input
      class="mb-3 border-blue"
      input-class="p-2 red text-center"
      model-value="Native input element must have red centered text. VaInput wrapper has a blue border."
      type="textarea"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
    }
  },
}
</script>

<style lang="scss">
.va-input-css-example {
  max-width: 700px;

  .red {
    color: red;
  }

  .border-blue {
    border: 1px solid blue;
  }
}
</style>
