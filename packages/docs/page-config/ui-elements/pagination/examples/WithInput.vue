<template>
  <VaPagination
    v-model="value"
    class="mb-3 justify-center sm:justify-start"
    :pages="20"
    input
  />
  <VaPagination
    v-model="value"
    class="mb-3 justify-center sm:justify-start"
    :pages="20"
    input
    buttons-preset="default"
  />
  <VaPagination
    v-model="value"
    class="justify-center sm:justify-start"
    :pages="20"
    input
    buttons-preset="secondary"
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
