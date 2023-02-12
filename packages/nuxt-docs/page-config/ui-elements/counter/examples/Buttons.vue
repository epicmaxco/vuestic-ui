<template>
  <div class="flex gap-5 flex-wrap">
    <va-counter v-model="value" buttons />

    <va-counter v-model="value" outline buttons />

    <va-counter v-model="value" bordered buttons />
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
<!--  -->