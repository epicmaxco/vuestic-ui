<template>
  <div class="va-input-css-example">
    <va-input
      class="mb-3"
      input-class="text--right red mb-2"
      :model-value="$t('input.examples.inputClass.exampleTexts[0]')"
    />
    <va-input
      class="mb-3 border-blue"
      input-class="red p-2"
      :model-value="$t('input.examples.inputClass.exampleTexts[1]')"
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

  .p-2 {
    padding: 2rem;
  }

  .border-blue {
    border: 1px solid blue;
  }
}
</style>
