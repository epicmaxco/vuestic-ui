<template>
  <VaDatePicker
    v-model="date"
    :month-names="[
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
    ]"
    :weekday-names="['日', '一', '二', '三', '四', '五', '六']"
  >
    <template #day="{ date }">
      {{ date.getDate() }}日
    </template>
    <template #year="{ year }">
      {{ year }}年
    </template>
    <template #month="{ month }">
      {{ month }}月
    </template>

    <template #buttonNext="{ onClick }">
      <VaButton
        preset="plain"
        size="small"
        class="link"
        @click="onClick"
      >
        →
      </VaButton>
    </template>
    <template #buttonPrev="{ onClick }">
      <VaButton
        preset="plain"
        size="small"
        class="link"
        @click="onClick"
      >
        ←
      </VaButton>
    </template>
  </VaDatePicker>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
    };
  },
};
</script>
