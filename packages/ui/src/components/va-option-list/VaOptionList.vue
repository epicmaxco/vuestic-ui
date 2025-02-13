<template>
  <VaMessageListWrapper
    :error="computedError"
    :error-messages="computedErrorMessages"
    :error-count="$props.errorCount"
  >
    <ul class="va-option-list__list">
      <li
        v-for="option in $props.options"
        :key="getTrackBy(option)"
      >
        <slot v-bind="{ option, selectedValue, isDisabled, getText, getValue }">
          <va-radio
            v-if="$props.type === 'radio'"
            :ref="setItemRef"
            v-model="selectedValue"
            :label="getText(option)"
            :disabled="isDisabled(option)"
            :option="getValue(option)"
            v-bind="computedProps"
          />
          <va-checkbox
            v-else-if="$props.type === 'checkbox'"
            :ref="setItemRef"
            v-model="selectedValue"
            :label="getText(option)"
            :disabled="isDisabled(option)"
            :array-value="getValue(option)"
            v-bind="computedProps"
          />
          <va-switch
            v-else
            :ref="setItemRef"
            v-model="selectedValue"
            :label="getText(option)"
            :disabled="isDisabled(option)"
            :array-value="getValue(option)"
            v-bind="computedProps"
          />
        </slot>
      </li>
    </ul>
  </VaMessageListWrapper>
</template>

<script lang="ts">
import { computed, PropType, onMounted } from 'vue'

import {
  useComponentPresetProp,
  useSelectableList, useSelectableListProps, SelectableOption,
  useValidation, useValidationProps,
  useStateful, useStatefulProps, useStatefulEmits,
  useArrayRefs,
  useValidationEmits,
} from '../../composables'

import { isDev } from '../../utils/env'

import { VaMessageListWrapper } from '../va-message-list'
import { VaCheckbox } from '../va-checkbox'
import { VaRadio } from '../va-radio'
import { VaSwitch } from '../va-switch'
import { pick } from '../../utils/pick'

type OptionListValue = SelectableOption | SelectableOption[] | null
</script>

<script lang="ts" setup>

defineOptions({
  name: 'VaOptionList',
})

const props = defineProps({
  ...useComponentPresetProp,
  ...useSelectableListProps,
  ...useValidationProps,
  ...useStatefulProps,
  type: {
    type: String as PropType<'radio' | 'checkbox' | 'switch'>,
    default: 'checkbox',
    validator: (type: any) => ['radio', 'checkbox', 'switch'].includes(type),
  },
  disabled: ({ type: Boolean, default: false }),
  readonly: ({ type: Boolean, default: false }),
  defaultValue: ({ type: [String, Number, Boolean, Object, Array] as PropType<OptionListValue | null> }),
  name: ({ type: String, default: '' }),
  color: ({ type: String, default: 'primary' }),
  leftLabel: ({ type: Boolean, default: false }),
  modelValue: ({ type: [String, Number, Boolean, Object, Array] as PropType<OptionListValue | null> }),
})

const emit = defineEmits([...useStatefulEmits, ...useValidationEmits, 'clear'])

const valueComputed = useStateful(props, emit, 'modelValue', { defaultValue: props.defaultValue })

const { getValue, getText, getTrackBy, getDisabled } = useSelectableList(props)

const { itemRefs, setItemRef } = useArrayRefs()

const isRadio = computed(() => props.type === 'radio')

const selectedValue = computed({
  get () {
    const value = isRadio.value ? null : []

    return valueComputed.value || value as OptionListValue
  },
  set (value: OptionListValue) {
    if (props.readonly) { return }

    if (isRadio.value && !Array.isArray(value)) {
      valueComputed.value = value ? getValue(value) : value
    } else {
      valueComputed.value = Array.isArray(value)
        ? value.map(getValue)
        : [value ? getValue(value) : value]
    }
  },
})

const isDisabled = (option: SelectableOption) => props.disabled || getDisabled(option)

const reset = () => withoutValidation(() => {
  valueComputed.value = null
  emit('clear')
  resetValidation()
})

const focus = () => {
  const firstActiveEl = Array.isArray(itemRefs.value) && itemRefs.value.find(el => !(el as HTMLInputElement).disabled)

  if (firstActiveEl && typeof firstActiveEl.focus === 'function') {
    firstActiveEl.focus()
  }
}

const {
  computedError,
  computedErrorMessages,
  withoutValidation,
  resetValidation,
} = useValidation(props, emit, { reset, focus, value: valueComputed })

const computedProps = computed(() => pick(props, ['name', 'color', 'readonly', 'leftLabel']))

onMounted(() => {
  if (isDev && props.type !== 'radio' && !Array.isArray(props.modelValue)) {
    console.warn(`Prop 'modelValue = ${props.modelValue}' has not a proper type!\n For component property 'type = ${props.type}' it must be of type 'array'.`)
  }
})

defineExpose({
  focus,
  reset,
})
</script>

<style lang="scss">
@import 'variables';

.va-option-list {
  &__list {
    line-height: var(--va-option-list-line-height);
    margin: 0;
    padding: 0;
    list-style: none;
    vertical-align: baseline;
  }
}
</style>
