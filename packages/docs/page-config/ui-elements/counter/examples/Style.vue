<template>
  <div class="flex gap-8 flex-wrap">
    <VaCounter v-model="value" />

    <VaCounter
      v-model="value"
      preset="solid"
    />

    <VaCounter
      v-model="value"
      preset="bordered"
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
