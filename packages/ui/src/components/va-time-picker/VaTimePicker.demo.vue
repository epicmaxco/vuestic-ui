<template>
  <VbDemo>
    <VbCard title="default">
      <VaTimePicker v-model="value" />
    </VbCard>

    <VbCard title="without value">
      <VaTimePicker v-model="undefValue" />
    </VbCard>

    <VbCard title="stateful">
      <VaTimePicker stateful />
    </VbCard>

    <VbCard title="view">
      <div class="d-flex">
        <VaTimePicker v-model="value" view="seconds" />
        <va-divider vertical />
        <VaTimePicker v-model="value" view="hours" />
      </div>
    </VbCard>

    <VbCard title="ampm">
      <div class="d-flex justify-center">
        <va-switch
          v-model="ampm"
          label="ampm"
          size="small"
        />
      </div>
      <br />
      <div class="d-flex">
        <VaTimePicker v-model="value" :ampm="ampm" />
        <va-divider vertical />
        <VaTimePicker v-model="value" :ampm="ampm" />
      </div>
    </VbCard>

    <VbCard title="value">
      <div class="d-flex justify-around">
        <span>23:05:53</span>
        <span>{{ selectedTime }}</span>
      </div>
      <br />
      <div class="d-flex">
        <VaTimePicker v-model="value" ampm />
        <va-divider vertical />
        <VaTimePicker v-model="value" :ampm="false" view="seconds" />
      </div>
    </VbCard>

    <VbCard title="filter">
      <VaTimePicker
        v-model="value"
        view="seconds"
        :ampm="false"
        :hoursFilter="(h) => h >= 9 && h <= 19"
        :minutesFilter="(m) => m % 10 === 0"
        :secondsFilter="(s) => s % 20 === 0"
      />
    </VbCard>

    <VbCard title="readonly">
      <VaTimePicker v-model="value" readonly />
    </VbCard>

    <VbCard title="disabled">
      <VaTimePicker v-model="value" disabled />
    </VbCard>

    <VbCard title="Framed">
      <VaTimePicker v-model="value" framed />
    </VbCard>

    <VbCard title="Visible cells count">
      <div class="d-flex justify-around">
        <span>Show 2</span>
        <span>Show 5</span>
        <span>Show 12</span>
      </div>
      <br />
      <div class="d-flex">
        <VaTimePicker v-model="value" :visible-cells-count="2" />
        <va-divider vertical />
        <VaTimePicker v-model="value" :visible-cells-count="5" />
        <va-divider vertical />
        <VaTimePicker v-model="value" :visible-cells-count="9" />
      </div>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaTimePicker from './VaTimePicker.vue'
import { VaDivider } from '../va-divider'
import { VaSwitch } from '../va-switch'

export default {
  components: {
    VaTimePicker,
    VaDivider,
    VaSwitch,
  },

  data () {
    return {
      value: new Date(2021, 2, 20, 23, 5, 53),
      undefValue: undefined,
      ampm: false,
    }
  },

  computed: {
    selectedTime () {
      const formatTime = (time) => time < 10 ? `0${time}` : time
      const hours = formatTime(this.value.getHours())
      const minutes = formatTime(this.value.getMinutes())
      const seconds = formatTime(this.value.getSeconds())

      return `${hours}:${minutes}:${seconds}`
    },
  },
}
</script>
