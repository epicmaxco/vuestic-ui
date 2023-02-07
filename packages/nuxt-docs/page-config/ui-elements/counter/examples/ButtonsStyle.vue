<template>
  <div class="row">
    <va-counter
      class="mx-6 my-2"
      v-model="value"
      buttons
      :flat="false"
      rounded
    />

    <va-counter
      class="mx-6 my-2"
      v-model="value"
      outline
      buttons
      :flat="false"
      margins="0"
      rounded
    />

    <va-counter class="mx-6 my-2" v-model="value" buttons :flat="false" />

    <va-counter
      class="mx-6 my-2"
      v-model="value"
      outline
      buttons
      :flat="false"
      margins="0"
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
