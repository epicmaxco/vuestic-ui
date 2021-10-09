<template>
  <va-dropdown
    class="va-time-input"
    v-model="isOpenSync"
    :offset="[0, 10]"
    :close-on-content-click="false"
    :disabled="disabled"
    position="bottom-start"
  >
    <template #anchor>
      <va-input
        v-model="valueText"
        :readonly="readonly || !manualInput"
        :error="!isValid"
        @change="onInputTextChanged"
      >
        <template v-for="(_, name) in $slots" v-slot:[name]="bind">
          <slot :name="name" v-bind="bind" />
        </template>
      </va-input>
    </template>

    <va-dropdown-content no-padding>
      <va-time-picker v-bind="timePickerProps" v-model="modelValueSync" />
    </va-dropdown-content>
  </va-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { VaTimePicker } from '../va-time-picker'
import { useSyncProp } from '../../composables/useSyncProp'
import { useTimeParser } from './hooks/time-text-parser'
import { extractComponentProps, filterComponentProps } from '../../utils/child-props'

export default defineComponent({
  components: { VaTimePicker },

  emits: ['update:modelValue', 'update:isOpen'],

  props: {
    ...extractComponentProps(VaTimePicker),
    isOpen: { type: Boolean },
    disabled: { type: Boolean, default: false },
    modelValue: { type: Date, default: undefined },
    format: { type: Function as PropType<(date: Date) => string> },

    parseTime: { type: Function as PropType<(input: string) => Date> },
    manualInput: { type: Boolean, default: false },
  },

  setup (props, { emit }) {
    const [isOpenSync] = useSyncProp('isOpen', props, emit)
    const [modelValueSync] = useSyncProp('modelValue', props, emit)

    const { parse, isValid } = useTimeParser(props)

    const valueText = computed<string>(() => {
      if (!isValid.value) { return '' }

      if (props.format) { return props.format(modelValueSync.value) }

      if (!modelValueSync.value) { return '' }

      return modelValueSync.value.toLocaleTimeString()
    })

    const onInputTextChanged = (val: string) => {
      const v = parse(val)

      if (isValid.value && v) {
        modelValueSync.value = v
      }
    }

    const changePeriod = (isPM: boolean) => {
      const h = modelValueSync.value.getHours()

      if (isPM && h <= 12) {
        modelValueSync.value = new Date(modelValueSync.value.setHours(h + 12))
      } else if (!isPM && h >= 12) {
        modelValueSync.value = new Date(modelValueSync.value.setHours(h - 12))
      }
    }

    const changePeriodToPm = () => changePeriod(true)
    const changePeriodToAm = () => changePeriod(false)

    return {
      timePickerProps: filterComponentProps(props, extractComponentProps(VaTimePicker)),
      isOpenSync,
      modelValueSync,
      valueText,
      changePeriodToPm,
      changePeriodToAm,
      onInputTextChanged,
      isValid,
    }
  },
})
</script>
