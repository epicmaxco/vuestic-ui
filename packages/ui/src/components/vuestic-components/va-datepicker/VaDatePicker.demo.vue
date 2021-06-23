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

    <VbCard title="slots">
      <va-date-picker v-model="value" class="mb-4">
        <template #prepend>
          prepend
        </template>
      </va-date-picker>
      <va-date-picker v-model="value" class="mb-4">
        <template #append>
          append
        </template>
      </va-date-picker>
      <va-date-picker v-model="value" class="mb-4">
        <template #prependInner>
          prependInner
        </template>
      </va-date-picker>
      <va-date-picker v-model="value">
        <template #appendInner>
          appendInner
        </template>
      </va-date-picker>
    </VbCard>

    <VbCard title="props to input">
      <va-date-picker v-model="value" class="mb-4" />
      <va-date-picker v-model="range" outline  class="mb-4" />
      <va-date-picker v-model="dates" bordered  class="mb-4" />
      <va-date-picker v-model="dates" color="danger" class="mb-4" />
      <va-date-picker v-model="dates" label="label" class="mb-4" />
    </VbCard>

    <VbCard title="props to calendar">
      <va-date-picker v-model="value" label="Weekday names" :weekdayNames="['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']"  class="mb-4" />

      <va-date-picker v-model="value" label="Month names" :monthNames="['January','February','March','April','May','June','July','August','September','October','November','December']" class="mb-4" />

      <va-date-picker v-model="value" label="Highlight weekend" highlightWeekends />
    </VbCard>

    <VbCard title="slots to calendar">
      <va-date-picker
        v-model="value"
        :monthNames="['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']"
        :weekdayNames="['日', '一', '二', '三', '四', '五', '六']"
      >
        <template #day="{ date }">
          {{ date.getDate() }}日
        </template>
        <template #year="{ year }">
          {{ year }} 年
        </template>
      </va-date-picker>
    </VbCard>

    <VbCard title="first weekday">
      <va-date-picker v-model="value" label="Sun (default)" class="mb-4" />

      <va-date-picker v-model="value" label="Monday" firstWeekday="Monday" class="mb-4" />
    </VbCard>

    <VbCard title="disable dates">
      <va-date-picker v-model="value" label="Disable all Tuesday and Tuesday" :allowedDates="(date) => date.getDay() !== 2 && date.getDay() !== 4" />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaDatePicker from './index'

const nextWeek = (() => { const d = new Date(); d.setDate(d.getDate() + 7); return d })()

export default {
  components: { VaDatePicker },
  data () {
    return {
      value: new Date(),
      range: { start: new Date(), end: nextWeek },
      dates: [new Date(), nextWeek],
    }
  },
}
</script>
