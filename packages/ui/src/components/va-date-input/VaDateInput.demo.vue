<template>
  <VbDemo>
    <VbCard title="default">
      Date
      <va-date-input v-model="value" />
      Date ranges
      <va-date-input v-model="range" />
      Dates
      <va-date-input v-model="dates" />
    </VbCard>

    <VbCard title="slots">
      <va-date-input v-model="value" class="mb-4">
        <template #prepend>
          prepend
        </template>
      </va-date-input>
      <va-date-input v-model="value" class="mb-4">
        <template #append>
          append
        </template>
      </va-date-input>
      <va-date-input v-model="value" class="mb-4">
        <template #prependInner>
          prependInner
        </template>
      </va-date-input>
      <va-date-input v-model="value">
        <template #appendInner>
          appendInner
        </template>
      </va-date-input>

      <va-date-input v-model="value">
        <template #input="{ valueText }">
          <input :value="valueText" />
        </template>
      </va-date-input>
    </VbCard>

    <VbCard title="props to input">
      <va-date-input v-model="value" class="mb-4" />
      <va-date-input v-model="range" outline  class="mb-4" />
      <va-date-input v-model="dates" bordered  class="mb-4" />
      <va-date-input v-model="dates" color="danger" class="mb-4" />
      <va-date-input v-model="dates" label="label" class="mb-4" />
    </VbCard>

    <VbCard title="calendar appearance">
      <va-date-input v-model="value" label="Weekday names" :weekdayNames="['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']" class="mb-4" />

      <va-date-input v-model="value" label="Month names" :monthNames="['January','February','March','April','May','June','July','August','September','October','November','December']" class="mb-4" />

      <va-date-input v-model="value" label="Hide weekdays" hideWeekDays class="mb-4" />

      <va-date-input v-model="value" label="Do not highlight today date" :highlightToday="false" />
    </VbCard>

    <VbCard title="weekends">
      <va-date-input v-model="value" label="Highlight weekend" highlight-weekends class="mb-4" />

      <va-date-input v-model="value" label="Every second day is weeked" highlight-weekends :weekends="(date) => date.getDay() % 2 === 0" class="mb-4" />
    </VbCard>

    <VbCard title="dropdown">
      <va-date-input v-model="value" v-model:is-open="isOpen" :label="`Should be open ${isOpen}`" class="mb-4" />
    </VbCard>

    <VbCard title="reset on close (range)">
      <va-date-input v-model="range" v-model:is-open="isOpen" label="enabled" class="mb-4" />

      <va-date-input v-model="range" v-model:is-open="isOpen" label="disabled" :reset-on-close="false" class="mb-4" />
    </VbCard>

    <VbCard title="slots to calendar">
      <va-date-input
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
      </va-date-input>

      <va-date-input
        v-model="value"
        label="Hide year"
      >
        <template #header="{ month, monthNames, switchView }">
          <va-chip @click="switchView" size="small">
            {{ monthNames[month] }}
          </va-chip>
        </template>
      </va-date-input>
    </VbCard>

    <VbCard title="first weekday">
      <va-date-input v-model="value" label="Sun (default)" class="mb-4" />

      <va-date-input v-model="value" label="Monday" firstWeekday="Monday" class="mb-4" />
    </VbCard>

    <VbCard title="disable dates">
      <va-date-input v-model="value" label="Disable all Tuesday and Thursday" :allowedDays="(date) => date.getDay() !== 2 && date.getDay() !== 4" />
    </VbCard>
  </VbDemo>
</template>

<script lang="ts">
import { VaDateInput } from './index'

const datePlusDay = (date: Date, days: number) => {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}
const nextWeek = datePlusDay(new Date(), 7)

export default {
  components: { VaDateInput },
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
