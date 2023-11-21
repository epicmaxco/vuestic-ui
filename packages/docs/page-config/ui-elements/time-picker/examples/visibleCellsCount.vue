<template>
  <h6>
    {{ value.getHours() }}:{{ value.getMinutes() }}:{{ value.getSeconds() }}
  </h6>

  <div class="flex gap-5 flex-wrap">
    <VaTimePicker
      v-model="value"
      :visible-cells-count="3"
    />
    <VaDivider vertical />
    <VaTimePicker
      v-model="value"
      :visible-cells-count="8"
    />
    <VaDivider vertical />
    <VaTimePicker
      v-model="value"
      :visible-cells-count="5"
    />
    <VaDivider vertical />
    <VaTimePicker
      v-model="value"
      :visible-cells-count="9"
    />
  </div>
</template>

<script>
export default {
  data() {
    return { value: new Date() };
  },
};
</script>
