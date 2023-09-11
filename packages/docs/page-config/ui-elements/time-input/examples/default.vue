<template>
  <va-time-input v-model="value" class="w-28" />
</template>

<script>
export default {
  data() {
    return {
      value: new Date(),
    };
  },
};
</script>
