<template>
  <VbDemo>
    <VbCard title="default">
      <VaTimeInput v-model="value" />
    </VbCard>

    <VbCard title="manual input">
      <VaTimeInput v-model="value" manual-input />
      <VaTimeInput v-model="value" manual-input leftIcon clearable />
    </VbCard>

    <VbCard title="without value">
      <VaTimeInput
        v-model="undefValue"
        manual-input
        clearable
        placeholder="Time..."
        leftIcon
        icon="thumb_up"
      />
    </VbCard>

    <VbCard title="slots" style="width: 450px;">
      <VaTimeInput v-model="value" label="appendInner">
        <template #appendInner>
          <va-icon name="done" />
        </template>
      </VaTimeInput>
      <VaTimeInput v-model="value" label="append">
        <template #append>
          <va-icon name="done" />
        </template>
      </VaTimeInput>
      <VaTimeInput v-model="value" label="prepend">
        <template #prepend>
          <va-icon name="done" />
        </template>
      </VaTimeInput>
      <VaTimeInput v-model="value" label="prependInner">
        <template #prependInner>
          <va-icon name="done" />
        </template>
      </VaTimeInput>
      <VaTimeInput v-model="value" clearable color="warning" label="prependInner & color=warning & clearable">
        <template #prependInner><va-icon name="done" /></template>
      </VaTimeInput>
      <VaTimeInput v-model="value" clearable color="warning" leftIcon label="prependInner & color=warning & clearable & leftIcon">
        <template #prependInner><va-icon name="done" /></template>
      </VaTimeInput>
      <VaTimeInput v-model="value" leftIcon clearable label="appendInner & clearable & leftIcon">
        <template #appendInner><va-icon name="done" /></template>
      </VaTimeInput>
    </VbCard>

    <VbCard title="period">
      <VaTimeInput :ampm="true" v-model="value" />
    </VbCard>

    <VbCard title="readonly and disabled">
      <VaTimeInput readonly v-model="value" />
      <VaTimeInput disabled v-model="value" />
    </VbCard>

    <VbCard title="validation">
      <VaTimeInput v-model="value" :rules="validationRules" clearable />
    </VbCard>

    <VbCard title="required mark">
      <VaTimeInput v-model="value" label="time" required-mark />
    </VbCard>

    <VbCard title="Hours and minutes filter">
      <VaInput
          v-model="hoursAndMinutesDivisor"
          label="Hours and minutes divisor:"
      />
      <VaTimeInput
          v-model="value"
          ampm
          :hoursFilter="hoursAndMinutesFilter"
          :minutesFilter="hoursAndMinutesFilter"
      />
    </VbCard>

    <VbCard title="Focus and Blur">
      <va-time-input ref="timeInputRef" v-model="value" clearable />
      <va-button @click="focusTimeInput">Focus</va-button>
      <va-button @click="blurTimeInput">Blur</va-button>
    </VbCard>

  </VbDemo>
</template>

<script>
import VaTimeInput from './VaTimeInput.vue'
import VaIcon from '../va-icon'
import VaInput from '../va-input'
import VaButton from '../va-button'

export default {
  components: {
    VaInput,
    VaTimeInput,
    VaIcon,
    VaButton,
  },

  data () {
    return {
      value: new Date(2021, 2, 20, 23, 5, 53),
      undefValue: undefined,
      validationRules: [(value) => {
        if (!value) { return true }
        return value.getHours?.() > 12 || 'Should be PM'
      }],
      hoursAndMinutesDivisor: 2,
    }
  },
  methods: {
    hoursAndMinutesFilter (hourOrMinute) {
      return hourOrMinute % this.hoursAndMinutesDivisor === 0
    },
    focusTimeInput () { this.$refs.timeInputRef.focus() },
    blurTimeInput () { this.$refs.timeInputRef.blur() },
  },
}
</script>
