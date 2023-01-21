<template>
  <va-date-picker
    v-model="date"
    :monthNames="['1','2','3','4','5','6','7','8','9','10','11','12']"
    :weekdayNames="['日', '一', '二', '三', '四', '五', '六']"
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
      <va-button preset="plain" size="small" class="link" @click="onClick">
        →
      </va-button>
    </template>
    <template #buttonPrev="{ onClick }">
      <va-button preset="plain" size="small" class="link" @click="onClick">
        ←
      </va-button>
    </template>
  </va-date-picker>
</template>

<script>
export default {
  data () {
    return {
      date: new Date(),
    }
  },
}
</script>
