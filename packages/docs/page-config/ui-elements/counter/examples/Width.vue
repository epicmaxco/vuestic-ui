<template>
  <div class="flex gap-8 flex-wrap">
    <va-counter
      v-model="value"
      width="250px"
    />

    <va-counter
      v-model="value"
      outline
      buttons
      margins="20px"
      width="200px"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 10,
    };
  },
};
</script>
