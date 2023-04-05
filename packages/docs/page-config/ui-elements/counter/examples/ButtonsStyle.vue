<template>
  <div class="flex gap-8 flex-wrap">
    <va-counter
      v-model="value"
      buttons
      :flat="false"
      rounded
    />

    <va-counter
      v-model="value"
      outline
      buttons
      :flat="false"
      margins="0"
      rounded
    />

    <va-counter
      v-model="value"
      buttons
      :flat="false"
    />

    <va-counter
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
