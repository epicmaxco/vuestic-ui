<template>
  <VaPagination
    v-model="value"
    :pages="15"
    :visible-pages="4"
    class="justify-center sm:justify-start"
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
