<template>
  <h6>
    {{ value.getHours() }}:{{ value.getMinutes() }}:{{ value.getSeconds() }}
  </h6>

  <div class="flex gap-5 flex-wrap">
    <VaTimePicker
      v-model="value"
      view="seconds"
      :hours-filter="(h) => h >= 9 && h <= 19"
      :minutes-filter="(m) => m % 10 === 0"
      :seconds-filter="(s) => s % 20 === 0"
    />

    <va-divider vertical />

    <VaTimePicker
      v-model="value"
      view="seconds"
      ampm
      :hours-filter="(h) => h >= 9 && h <= 19"
      :minutes-filter="(m) => m % 10 === 0"
      :seconds-filter="(s) => s % 20 === 0"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date(),
    };
  },
};
</script>
