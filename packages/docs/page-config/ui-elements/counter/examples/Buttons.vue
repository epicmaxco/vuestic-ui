<template>
  <div class="flex gap-8 flex-wrap">
    <va-counter
      v-model="value"
      buttons
    />

    <va-counter
      v-model="value"
      preset="solid"
      buttons
    />

    <va-counter
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
