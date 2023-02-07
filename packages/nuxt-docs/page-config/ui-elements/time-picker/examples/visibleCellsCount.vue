<template>
  <h6>
    {{ value.getHours() }}:{{ value.getMinutes() }}:{{ value.getSeconds() }}
  </h6>

  <div class="flex gap-5 flex-wrap">
    <va-time-picker v-model="value" :visible-cells-count="3" />
    <va-divider vertical />
    <va-time-picker v-model="value" :visible-cells-count="8" />
    <va-divider vertical />
    <va-time-picker v-model="value" :visible-cells-count="5" />
    <va-divider vertical />
    <va-time-picker v-model="value" :visible-cells-count="9" />
  </div>
</template>

<script>
export default {
  data() {
    return { value: new Date() };
  },
};
</script>
