<template>
  <va-slider
    v-model="value1"
    label="Disabled"
    :disabled="isState"
  />
  <va-slider
    v-model="value2"
    label="Readonly"
    :readonly="isState"
  />
  <va-checkbox
    v-model="isState"
    class="mt-2"
    label="States enabled"
  />
</template>

<script>
export default {
  data() {
    return {
      value1: 33,
      value2: 66,
      isState: true,
    };
  },
};
</script>
