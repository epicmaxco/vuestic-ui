<template>
  <va-slider v-model="value1">
    <template #prepend>
      <va-counter
        v-model="value1"
        :min="0"
        :max="100"
        class="w-[110px]"
      />
    </template>
  </va-slider>
  <va-slider v-model="value2">
    <template #append>
      <va-counter
        v-model="value2"
        :min="0"
        :max="100"
        class="w-[110px]"
      />
    </template>
  </va-slider>
  <va-slider v-model="value3">
    <template #label>
      <div class="italic text-black">
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
