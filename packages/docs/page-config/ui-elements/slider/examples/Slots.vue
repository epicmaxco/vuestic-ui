<template>
  <va-slider v-model="value1">
    <template #prepend>
      <va-input
        v-model.number="value1"
        style="width: 70px"
        type="number"
      />
    </template>
  </va-slider>
  <va-slider v-model="value2">
    <template #append>
      <va-input
        v-model.number="value2"
        style="width: 70px"
        type="number"
      />
    </template>
  </va-slider>
  <va-slider v-model="value3">
    <template #label>
      <div style="font-style: italic; color: black">
        LABEL SLOT
      </div>
    </template>
  </va-slider>
</template>

<script>
export default {
  data() {
    return {
      value1: 45,
      value2: 45,
      value3: 45,
    };
  },
};
</script>
