<template>
  <h6>
    {{ value.getHours() }}:{{ value.getMinutes() }}:{{ value.getSeconds() }}
  </h6>

  <div class="flex">
    <va-time-picker v-model="value" />
    <va-divider vertical />
    <va-time-picker v-model="value" ampm />
  </div>
</template>

<script>
export default {
  data() {
    return { value: new Date() };
  },
};
</script>
