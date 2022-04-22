<template>
  <VaMessageListWrapper
    :error="computedError"
    :error-messages="computedErrorMessages"
    :error-count="$props.errorCount"
  >
    <ul class="va-option-list__list">
      <li
        v-for="(option, index) in $props.options"
        :key="getKey(option)"
      >
        <slot v-bind="{ option, selectedValue, index, isDisabled, getText, getValue }">
          <va-radio
            v-if="$props.type === 'radio'"
            :ref="setItemRef"
            v-model="selectedValue"
            :label="getText(option)"
            :disabled="isDisabled(option)"
            :option="getValue(option)"
            :tabindex="index"
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
import { computed, defineComponent, PropType, onMounted } from 'vue'
import pick from 'lodash/pick'

import { generateUniqueId } from '../../services/utils'
import { __DEV__ } from '../../utils/global-utils'
import { useSelectableList, useSelectableListProps, SelectableOption } from '../../composables/useSelectableList'
import { useValidation, useValidationProps } from '../../composables/useValidation'
import { useStateful, useStatefulProps, useStatefulEmits } from '../../composables/useStateful'
import { useArrayRefs } from '../../composables/useArrayRefs'
import { VaMessageListWrapper } from '../va-input'
import VaCheckbox from '../va-checkbox'
import VaRadio from '../va-radio'
import VaSwitch from '../va-switch'

type OptionListValue = SelectableOption | SelectableOption[] | null

export default defineComponent({
  name: 'VaOptionList',
  components: {
    VaRadio,
    VaCheckbox,
    VaSwitch,
    VaMessageListWrapper,
  },
  emits: [...useStatefulEmits],
  props: {
    ...useSelectableListProps,
    ...useValidationProps,
    ...useStatefulProps,
    type: {
      type: String as PropType<'radio' | 'checkbox' | 'switch'>,
      default: 'checkbox',
      validator: (type: any) => ['radio', 'checkbox', 'switch'].includes(type),
    },
    disabled: ({ type: Boolean as PropType<boolean>, default: false }),
    readonly: ({ type: Boolean as PropType<boolean>, default: false }),
    defaultValue: ({ type: [String, Number, Object, Array] as PropType<OptionListValue | null> }),
    name: ({ type: String as PropType<string>, default: generateUniqueId }),
    color: ({ type: String as PropType<string>, default: 'primary' }),
    leftLabel: ({ type: Boolean, default: false }),
    modelValue: ({ type: [String, Number, Object, Array] as PropType<OptionListValue | null> }),
  },

  setup (props, { emit }) {
    const { valueComputed } = useStateful(props, emit, props.defaultValue)

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

    const getKey = (option: SelectableOption) => getTrackBy(option)

    const isDisabled = (option: SelectableOption) => props.disabled || getDisabled(option)

    const reset = () => { valueComputed.value = undefined }

    const focus = () => {
      const firstActiveEl = Array.isArray(itemRefs.value) && itemRefs.value.find(el => !(el as HTMLInputElement).disabled)

      if (firstActiveEl && typeof firstActiveEl.focus === 'function') {
        firstActiveEl.focus()
      }
    }

    const { computedError, computedErrorMessages } = useValidation(props, emit, reset, focus)

    const computedProps = computed(() => pick(props, ['name', 'color', 'readonly', 'leftLabel']))

    onMounted(() => {
      if (__DEV__ && props.type !== 'radio' && !Array.isArray(props.modelValue)) {
        console.warn(`Prop 'modelValue = ${props.modelValue}' has not a proper type!\n For component property 'type = ${props.type}' it must be of type 'array'.`)
      }
    })

    return {
      selectedValue,
      computedError,
      computedErrorMessages,
      getValue,
      getText,
      getKey,
      isDisabled,
      reset,
      focus,
      setItemRef,
      computedProps,
    }
  },
})
</script>

<style lang="scss">
@import 'variables';

.va-option-list {
  &__list {
    line-height: var(--va-option-list-line-height);
  }
}
</style>
