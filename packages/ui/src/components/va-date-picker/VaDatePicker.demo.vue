<template>
  <VbDemo>
    <VbCard title="default (auto mode)">
      <va-date-picker v-model="value" />
    </VbCard>

    <VbCard title="default (single)">
      <va-date-picker mode="single" v-model="value" />
    </VbCard>

    <VbCard title="default (range)">
      <va-date-picker mode="range" v-model="range" />
    </VbCard>

    <VbCard title="default (multiple)">
      <va-date-picker mode="multiple" v-model="dates" />
    </VbCard>

    <VbCard title="statefull">
      <va-date-picker stateful />
    </VbCard>

    <VbCard title="without value">
      <va-date-picker />
    </VbCard>

    <VbCard title="weekday names">
      <va-date-picker v-model="value" :weekdayNames="['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']" />
    </VbCard>

    <VbCard title="month names">
      <va-date-picker v-model="value" :monthNames="['January','February','March','April','May','June','July','August','September','October','November','December']" />
    </VbCard>

    <VbCard title="hide weekdays">
      <va-date-picker v-model="value" hideWeekDays class="mb-4" />
    </VbCard>

    <VbCard title="do not highlight today date">
      <va-date-picker v-model="value" :highlightToday="false" />
    </VbCard>

    <VbCard title="weekends">
      <va-date-picker v-model="value" highlight-weekend class="mb-4" />

      <h5 class="mb-2">Every second day is weeked</h5>
      <va-date-picker v-model="value" highlight-weekend :weekends="(date) => date.getDay() % 2 === 0" class="mb-4" />
    </VbCard>

    <VbCard title="slots to calendar">
      <h5 class="mb-2">Custom day and year template</h5>
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

      <h5 class="mb-2">Custom header</h5>
      <va-date-picker v-model="value">
        <template #header="{ month, monthNames, switchView }">
          <va-chip @click="switchView" size="small">
            {{ monthNames[month] }}
          </va-chip>
        </template>
      </va-date-picker>

      <h5 class="mb-2">Month control buttons</h5>
      <va-date-picker v-model="value">
        <template #buttonNext="{ onClick }">
          <va-chip size="small" @click="onClick">
            Next
          </va-chip>
        </template>
        <template #buttonPrev="{ onClick }">
          <va-chip size="small" @click="onClick">
            Prev
          </va-chip>
        </template>
      </va-date-picker>
    </VbCard>

    <VbCard title="first weekday">
      <h5 class="mb-2">Sun (default)</h5>
      <va-date-picker v-model="value" class="mb-4" />
      <h5 class="mb-2">Monday</h5>
      <va-date-picker v-model="value" first-weekday="Monday" />
    </VbCard>

    <VbCard title="show other months">
      <va-date-picker v-model="value" :show-other-months="true" />
    </VbCard>

    <VbCard title="View">
      <h5 class="mb-2">day</h5>
      <va-date-picker v-model="monthValue" v-model:view="dayView" type="day" class="mb-4" />

      <h5 class="mb-2">month</h5>
      <va-date-picker v-model="monthValue" v-model:view="monthView" type="day" class="mb-4" />

      <h5 class="mb-2">year</h5>
      <va-date-picker v-model="months" v-model:view="yearView" type="day" class="mb-4" />
    </VbCard>

    <VbCard title="Month picker">
      <h5 class="mb-2">Single</h5>
      <va-date-picker v-model="monthValue" type="month" class="mb-4" />

      <h5 class="mb-2">Range</h5>
      <va-date-picker v-model="monthRange" type="month" class="mb-4" />

      <h5 class="mb-2">Multiple</h5>
      <va-date-picker v-model="months" type="month" class="mb-4" />
    </VbCard>

    <VbCard title="Year picker">
      <h5 class="mb-2">Single</h5>
      <va-date-picker v-model="monthValue" type="year" class="mb-4" />

      <h5 class="mb-2">Range</h5>
      <va-date-picker v-model="monthRange" type="year" class="mb-4" />

      <h5 class="mb-2">Multiple</h5>
      <va-date-picker v-model="months" type="year" />
    </VbCard>

    <VbCard title="disable dates">
      <h5 class="mb-2">Disable all Tuesday and Thursday</h5>
      <va-date-picker class="mb-2" v-model="value" :allowedDays="(date) => date.getDay() !== 2 && date.getDay() !== 4" />

      <h5 class="mb-2">Disable all January and December</h5>
      <va-date-picker v-model="monthRange" :allowedMonths="(date) => date.getMonth() !== 0 && date.getMonth() !== 11" type="month" class="mb-4" />
    </VbCard>

    <VbCard title="calendar CSS variables & colors">
      <va-date-picker
        v-model="range"
        color="#ff00ff"
        weekends-color="#00ffff"
        highlight-weekend
        show-other-months
        :allowedDays="(date) => date.getDay() !== 5"
      />
    </VbCard>
  </VbDemo>
</template>

<script lang="ts">
import { VaDatePicker } from './index'
import VaChip from '../va-chip'

const datePlusDay = (date: Date, days: number) => {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}
const nextWeek = datePlusDay(new Date(), 7)

export default {
  components: { VaDatePicker, VaChip },
  data () {
    return {
      value: new Date(),
      range: { start: new Date(), end: nextWeek },
      dates: [new Date(), nextWeek],
      monthValue: new Date(),
      monthRange: { start: new Date(), end: datePlusDay(new Date(), 62) },
      months: [new Date(), datePlusDay(new Date(), 62)],

      dayView: { type: 'day', month: 6, year: 2020 },
      monthView: { type: 'month' },
      yearView: { type: 'year' },
    }
  },
}
</script>
