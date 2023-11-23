<template>
  <div class="flex gap-8 flex-wrap">
    <VaCounter
      v-model="value"
      buttons
      :flat="false"
      rounded
    />

    <VaCounter
      v-model="value"
      outline
      buttons
      :flat="false"
      margins="0"
      rounded
    />

    <VaCounter
      v-model="value"
      buttons
      :flat="false"
    />

    <VaCounter
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
