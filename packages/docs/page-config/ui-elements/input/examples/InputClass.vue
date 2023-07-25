<template>
  <div class="va-input-css-example">
    <va-input
      class="mr-3"
      input-class="va-text-right color mb-2"
      model-value="This input must have right-aligned green text with bottom indent."
    />
    <va-input
      class="border-gray"
      input-class="color p-2"
      model-value="Native input element must have green text. VaInput wrapper has a gray border."
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
