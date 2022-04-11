<template>
  <VbDemo>
    <VbCard title="default">
      Date
      <va-date-input v-model="value" />
      Date ranges
      <va-date-input v-model="range" leftIcon />
      Dates and clearable
      <va-date-input v-model="dates" clearable />
      Statefull
      <va-date-input stateful clearable />
    </VbCard>

    <VbCard title="icon & clearable">
      <va-date-input
        class="my-2"
        label="default icon"
        v-model="value"
      />
      <va-date-input
        class="my-2"
        label="default icon and clearable"
        v-model="value"
        clearable
      />
      <va-date-input
        class="my-2"
        label="left icon"
        v-model="value"
        leftIcon
      />
      <va-date-input
        class="my-2"
        label="left icon and clearable"
        v-model="value"
        leftIcon
        clearable
      />
      <va-date-input
        class="my-2"
        label="custom left icon and clear icon"
        v-model="value"
        leftIcon
        clearable
        icon="thumb_up"
        clearableIcon="done"
      />
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
      <va-date-input v-model="value" class="mb-4" leftIcon clearable>
        <template #prependInner>
          prependInner
        </template>
      </va-date-input>
      <va-date-input v-model="value" clearable>
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

    <VbCard title="Manual Input">
      <va-date-input
          v-model="value"
          manual-input
          label="Manual Input"
      />
    </VbCard>

    <VbCard title="View prop">
      <va-date-input
          v-model="value"
          v-model:view="dayView"
          label="Calendar should open on 2013"
      />
    </VbCard>

    <VbCard title="Reset Model Value">
      <va-button @click="resetModelValue()">Reset model value</va-button>
    </VbCard>

    <VbCard title="Set Model Value">
      <va-button @click="setModelValue()">Set model value</va-button>
    </VbCard>

    <VbCard title="state">
      <va-date-input v-model="value" disabled clearable label="Disabled" />
      <va-date-input v-model="value" readonly clearable label="Readonly" />
      <va-date-input v-model="value" success clearable label="Success" />
      <va-date-input v-model="value" error clearable label="Error" />
    </VbCard>

    <VbCard title="validation">
      <va-date-input v-model="value" :rules="validationRules1" clearable />
      <va-date-input v-model="value" :rules="validationRules2" clearable />
    </VbCard>
  </VbDemo>
</template>

<script lang="ts">
import { VaDateInput } from './index'
import VaChip from '../va-chip'
import VaButton from '../va-button/VaButton.vue'

const datePlusDay = (date: Date, days: number) => {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}
const nextWeek = datePlusDay(new Date(), 7)

export default {
  components: { VaButton, VaDateInput, VaChip },
  data () {
    return {
      value: new Date(),
      range: { start: new Date(), end: nextWeek },
      dates: [new Date(), nextWeek],
      dayView: { type: 'day', month: 3, year: 2013 },

      validationRules1: [(value: Date) => {
        return !!value || 'Should be value'
      }],

      validationRules2: [(value: Date) => {
        if (!value) { return true }
        return value.getDate?.() === 10 || 'Should be 10th day'
      }],

      // Dropdown
      isOpen: false,
    }
  },
  methods: {
    resetModelValue () {
      (this as any).value = undefined;
      (this as any).range = undefined;
      (this as any).dates = undefined
    },
    setModelValue () {
      (this as any).value = new Date();
      (this as any).range = { start: new Date(), end: nextWeek };
      (this as any).dates = [new Date(), nextWeek]
    },
  },
}
</script>
