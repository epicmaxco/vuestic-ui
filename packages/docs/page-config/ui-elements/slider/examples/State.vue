<template>
  <VaSlider
    v-model="value1"
    label="Disabled"
    :disabled="isState"
  />
  <VaSlider
    v-model="value2"
    label="Readonly"
    :readonly="isState"
  />
  <VaCheckbox
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
