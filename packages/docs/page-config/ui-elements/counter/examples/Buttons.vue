<template>
  <div class="flex gap-8 flex-wrap">
    <VaCounter
      v-model="value"
      buttons
    />

    <VaCounter
      v-model="value"
      preset="solid"
      buttons
    />

    <VaCounter
      v-model="value"
      preset="bordered"
      buttons
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
