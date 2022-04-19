<template>
  <VaMessageListWrapper
    :error="computedError"
    :error-messages="computedErrorMessages"
    :error-count="$props.errorCount"
  >
    <ul
      class="va-option-list__list"
      :id="String($props.id)"
    >
      <li
        v-for="(option, index) in $props.options"
        :key="getKey(option)"
      >
        <slot
          :props="{
            option,
            isDisabled,
            name: $props.name,
            color: $props.color,
            leftLabel: $props.leftLabel,
            getText,
            selectedValue,
            index
          }"
        >
          <va-radio
            v-if="$props.type === 'radio'"
            ref="input"
            :option="getValue(option)"
            :disabled="isDisabled(option)"
            :name="$props.name"
            :color="$props.color"
            :left-label="$props.leftLabel"
            :label="getText(option)"
            v-model="selectedValue"
            :tabindex="index"
          />
          <va-checkbox
            v-else-if="$props.type === 'checkbox'"
            ref="input"
            v-model="selectedValue"
            :label="getText(option)"
            :disabled="isDisabled(option)"
            :left-label="$props.leftLabel"
            :array-value="getValue(option)"
            :color="$props.color"
            :name="$props.name"
          />
          <va-switch
            v-else
            ref="input"
            v-model="selectedValue"
            :label="getText(option)"
            :disabled="isDisabled(option)"
            :left-label="$props.leftLabel"
            :array-value="getValue(option)"
            :color="$props.color"
            :name="$props.name"
          />
        </slot>
      </li>
    </ul>
  </VaMessageListWrapper>
</template>

<script lang="ts">
import { ref, computed, defineComponent, PropType, onMounted } from 'vue'

import { generateUniqueId } from '../../services/utils'
import { useSelectableList, useSelectableListProps, SelectableOption } from '../../composables/useSelectableList'
import { useValidation, useValidationProps } from '../../composables/useValidation'
import { useStateful, statefulComponentOptions } from '../../mixins/StatefulMixin/cStatefulMixin'
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
  emits: [...statefulComponentOptions.emits],
  props: {
    ...useSelectableListProps,
    ...useValidationProps,
    ...statefulComponentOptions.props,
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
    const { valueComputed } = useStateful(props, emit)
    const { getValue, getText, getTrackBy, getDisabled } = useSelectableList(props)

    const input = ref<HTMLElement>()

    const isRadio = computed(() => {
      return props.type === 'radio'
    })

    const selectedValue = computed({
      get () {
        const value = isRadio.value ? null : []

        return valueComputed.value || props.defaultValue || value as OptionListValue
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
      const firstActiveEl = Array.isArray(input.value) && input.value.find(el => !el.disabled)

      if (firstActiveEl && typeof firstActiveEl.focus === 'function') {
        firstActiveEl.focus()
      }
    }

    const { computedError, computedErrorMessages } = useValidation(props, emit, reset, focus)

    onMounted(() => {
      if (!valueComputed.value && props.defaultValue) {
        selectedValue.value = props.defaultValue
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
