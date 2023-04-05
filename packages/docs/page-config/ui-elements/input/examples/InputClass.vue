<template>
  <div class="va-input-css-example">
    <va-input
      class="mr-3"
      input-class="va-text-right color mb-2"
      :model-value="$t('input.examples.inputClass.exampleTexts[0]')"
    />
    <va-input
      class="border-gray"
      input-class="color p-2"
      :model-value="$t('input.examples.inputClass.exampleTexts[1]')"
      type="textarea"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
};
</script>

<style lang="scss">
.va-input-css-example {
  max-width: 700px;

  .color {
    color: var(--va-success);
  }

  .p-2 {
    padding: 2rem 0;
  }

  .border-gray {
    border: 1px solid darkgray;
  }
}
</style>
