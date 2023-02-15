<template>
  <div class="flex gap-5 flex-wrap">
    <div class="flex gap-5 flex-wrap">
      <va-counter
        v-model="value"
        readonly
      />

      <va-counter
        v-model="value"
        buttons
        readonly
      />
    </div>

    <div class="flex gap-5 flex-wrap">
      <va-counter
        v-model="value"
        disabled
      />

      <va-counter
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
