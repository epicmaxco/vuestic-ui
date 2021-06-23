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
      <va-date-picker v-model="value" :weekdayNames="['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']"  class="mb-4" />

      <va-date-picker v-model="value" :monthNames="['January','February','March','April','May','June','July','August','September','October','November','December']"  class="mb-4" />
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
