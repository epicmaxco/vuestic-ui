<template>
  <h6>
    {{ value.getHours() }}:{{ value.getMinutes() }}:{{ value.getSeconds() }}
  </h6>

  <div class="flex gap-5 flex-wrap">
    <VaTimePicker
      v-model="value"
      ampm
    />
    <VaDivider vertical />
    <VaTimePicker
      v-model="value"
      ampm
      :period-updates-model-value="false"
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
