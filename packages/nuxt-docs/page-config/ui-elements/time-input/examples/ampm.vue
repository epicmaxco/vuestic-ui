<template>
  <div class="flex gap-5 flex-wrap">
    <va-time-input v-model="value" class="mr-3" />
    <va-time-input v-model="value" ampm />
  </div>
</template>

<script>
export default {
  data() {
    return { value: new Date() };
  },
};
</script>
