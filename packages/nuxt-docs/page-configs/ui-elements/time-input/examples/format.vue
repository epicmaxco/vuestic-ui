<template>
  <h6>Default format function</h6>
  <div class="d-flex">
    <va-time-input v-model="value" />
    <va-divider vertical />
    <va-time-input v-model="value" ampm />
  </div>

  <h6>Custom format function</h6>

  <div class="d-flex">
    <va-time-input v-model="value" :format="formatFn" />
  </div>

  <code> (d) => d.toLocaleTimeString() </code>
</template>

<script>
export default {
  data() {
    return {
      value: new Date(),
      formatFn: (d) => d.toLocaleTimeString(),
    };
  },
};
</script>
