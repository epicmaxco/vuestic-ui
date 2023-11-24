<template>
  <div class="flex gap-8 flex-wrap">
    <VaCounter
      v-model="value"
      width="250px"
    />

    <VaCounter
      v-model="value"
      outline
      buttons
      margins="20px"
      style="width: 200px"
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
