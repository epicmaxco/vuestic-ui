<template>
  <div class="row">
    <va-counter class="mx-6 my-2" v-model="value" />

    <va-counter class="mx-6 my-2" v-model="value" outline />

    <va-counter class="mx-6 my-2" v-model="value" bordered />
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
