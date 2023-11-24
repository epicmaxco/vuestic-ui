<template>
  <div class="flex gap-8 flex-wrap">
    <div class="flex gap-8 flex-wrap">
      <VaCounter
        v-model="value"
        readonly
      />

      <VaCounter
        v-model="value"
        buttons
        readonly
      />
    </div>

    <div class="flex gap-8 flex-wrap">
      <VaCounter
        v-model="value"
        disabled
      />

      <VaCounter
        v-model="value"
        buttons
        disabled
      />
    </div>
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
