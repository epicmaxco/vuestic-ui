<template>
  <va-pagination
    v-model="value"
    :pages="10"
    :visible-pages="3"
    buttons-preset="default"
    rounded
    gapped
    border-color="primary"
    class="mb-6"
  />
  <va-pagination
    v-model="value"
    :pages="10"
    :visible-pages="3"
    buttons-preset="primary"
    rounded
    gapped
    border-color="primary"
    class="mb-6"
  />
  <va-pagination
    v-model="value"
    :pages="10"
    :visible-pages="3"
    buttons-preset="secondary"
    rounded
    gapped
    border-color="primary"
  />
</template>

<script>
export default {
  data() {
    return {
      value: 3,
    };
  },
};
</script>
