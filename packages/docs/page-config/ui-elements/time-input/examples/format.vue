<template>
  <h6>Default format function</h6>
  <div class="flex">
    <va-time-input
      v-model="value"
      class="mr-3"
    />
    <va-time-input
      v-model="value"
      ampm
    />
  </div>

  <h6>Custom format function</h6>
  <code> (d) => d.toLocaleTimeString() </code>
  <div class="flex">
    <va-time-input
      v-model="value"
      :format="formatFn"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date(),
      formatFn: (d) => d?.toLocaleTimeString?.(),
    };
  },
};
</script>
