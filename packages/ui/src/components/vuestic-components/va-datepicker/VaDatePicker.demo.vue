<template>
  <VbDemo>
    <VbCard title="default">
      Date
      <va-date-picker v-model="value" />
      Date ranges
      <va-date-picker v-model="range" />
      Dates
      <va-date-picker v-model="dates" />
    </VbCard>

    <VbCard title="calendar appearance">
      Weekday names
      <va-date-picker v-model="value" :weekdayNames="['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']" class="mb-4" />

      Month names
      <va-date-picker v-model="value" :monthNames="['January','February','March','April','May','June','July','August','September','October','November','December']" class="mb-4" />

      Hide weekdays
      <va-date-picker v-model="value" hideWeekDays class="mb-4" />
      Do not highlight today date
      <va-date-picker v-model="value" :highlightTodayDate="false" />
    </VbCard>

    <VbCard title="weekends">
      Highlight weekend
      <va-date-picker v-model="value" highlight-weekends class="mb-4" />
      Every second day is weeked
      <va-date-picker v-model="value" highlight-weekends :weekends="(date) => date.getDay() % 2 === 0" class="mb-4" />
    </VbCard>

    <VbCard title="slots to calendar">
      <va-date-picker
        v-model="value"
        :monthNames="['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']"
        :weekdayNames="['日', '一', '二', '三', '四', '五', '六']"
        class="mb-4"
      >
        <template #day="{ date }">
          {{ date.getDate() }}日
        </template>
        <template #year="{ year }">
          {{ year }} 年
        </template>
      </va-date-picker>

      <va-date-picker
        v-model="value"
        label="Hide year"
      >
        <template #header-text="{ month, monthNames, switchView }">
          <va-chip @click="switchView" size="small">
            {{ monthNames[month] }}
          </va-chip>
        </template>
      </va-date-picker>
    </VbCard>

    <VbCard title="first weekday">
      Sun (default)
      <va-date-picker v-model="value" class="mb-4" />
      Monday
      <va-date-picker v-model="value" first-weekday="Monday" />
    </VbCard>

    <VbCard title="disable dates">
      Disable all Tuesday and Thursday
      <va-date-picker v-model="value" :allowedDates="(date) => date.getDay() !== 2 && date.getDay() !== 4" />
    </VbCard>

    <VbCard title="show other months">
      <va-date-picker v-model="value" :show-other-months="true" />
    </VbCard>

    <VbCard title="date picker">
      Date
      <va-date-picker v-model="value" class="mb-4" />
      Date ranges
      <va-date-picker v-model="range" class="mb-4" />
      Dates
      <va-date-picker v-model="dates" class="mb-4" />

      <va-date-picker v-model="dates" valueType="month" class="mb-4" />
    </VbCard>
  </VbDemo>
</template>

<script lang="ts">
import { VaDatePicker } from './index'

const datePlusDay = (date: Date, days: number) => {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}
const nextWeek = datePlusDay(new Date(), 7)

export default {
  components: { VaDatePicker },
  data () {
    return {
      value: new Date(),
      range: { start: new Date(), end: nextWeek },
      dates: [new Date(), nextWeek],

      // Dropdown
      isOpen: false,
    }
  },
}
</script>
