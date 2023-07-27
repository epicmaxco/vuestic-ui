<template>
  <div class="flex gap-8 flex-wrap">
    <va-counter v-model="value" />

    <va-counter
      v-model="value"
      preset="solid"
    />

    <va-counter
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
