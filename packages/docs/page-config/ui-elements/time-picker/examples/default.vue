<template>
  <h6>
    {{ value.getHours() }}:{{ value.getMinutes() }}:{{ value.getSeconds() }}
  </h6>

  <VaTimePicker v-model="value" />
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
