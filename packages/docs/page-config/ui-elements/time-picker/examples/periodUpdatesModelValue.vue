<template>
  <h6>
    {{ value.getHours() }}:{{ value.getMinutes() }}:{{ value.getSeconds() }}
  </h6>

  <div class="flex gap-5 flex-wrap">
    <va-time-picker
      v-model="value"
      ampm
    />
    <va-divider vertical />
    <va-time-picker
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
