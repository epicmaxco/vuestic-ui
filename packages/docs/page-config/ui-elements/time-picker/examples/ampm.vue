<template>
  <h6>
    {{ value.getHours() }}:{{ value.getMinutes() }}:{{ value.getSeconds() }}
  </h6>

  <div class="flex">
    <VaTimePicker v-model="value" />
    <VaDivider vertical />
    <VaTimePicker
      v-model="value"
      ampm
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
