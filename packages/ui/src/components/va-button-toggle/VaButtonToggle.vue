<template>
  <div class="va-button-toggle">
    <va-button-group
      :color="color"
      :textColor="textColor"
      :rounded="rounded"
      :outline="outline"
      :flat="flat"
      :gradient="gradient"
    >
      <va-button
        v-for="option in options"
        v-bind="getButtonProps(option.value)"
        :key="option.value"
        :disabled="disabled"
        :size="size"
        :class="getButtonClass(option.value)"
        @click="changeValue(option.value)"
      >
        {{ option.label }}
      </va-button>
    </va-button-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

import { getTextColor, shiftHSLAColor } from '../../services/color-config/color-functions'
import { useColors } from '../../composables/useColor'
import VaButton from '../va-button'
import VaButtonGroup from '../va-button-group'

export default defineComponent({
  name: 'VaButtonToggle',
  components: {
    VaButtonGroup,
    VaButton,
  },
  emits: ['update:modelValue'],
  props: {
    options: { type: Array as PropType<any[]>, default: () => [] },
    color: { type: String as PropType<string>, default: 'primary' },
    textColor: { type: String as PropType<string>, default: undefined },
    activeButtonTextColor: { type: String as PropType<string>, default: 'white' },
    modelValue: { type: [String, Number] as PropType<string | number>, default: '' },
    outline: { type: Boolean as PropType<boolean>, default: false },
    flat: { type: Boolean as PropType<boolean>, default: false },
    rounded: { type: Boolean as PropType<boolean>, default: true },
    disabled: { type: Boolean as PropType<boolean>, default: false },
    size: {
      type: String as PropType<string>,
      default: 'medium',
      validator: (modelValue: 'medium' | 'small' | 'large') => ['medium', 'small', 'large'].includes(modelValue),
    },

    toggleColor: { type: String as PropType<string>, default: '' },
    gradient: { type: Boolean as PropType<boolean>, default: false },
  },
  setup (props, { emit }) {
    const { getColor } = useColors()
    const colorComputed = computed(() => getColor(props.color))
    const toggleColorComputed = computed(() => getColor(props.toggleColor))

    const getButtonProps = (buttonValue: any) => {
      if (buttonValue !== props.modelValue) { return }

      if (props.outline || props.flat) {
        return {
          textColor: props.activeButtonTextColor,
          color: props.toggleColor ? toggleColorComputed.value : colorComputed.value,
          outline: false,
          flat: false,
        }
      }

      return {
        textColor: props.activeButtonTextColor ? props.activeButtonTextColor : getTextColor(colorComputed.value),
        color: props.toggleColor ? toggleColorComputed.value : shiftHSLAColor(colorComputed.value, { l: -6 }),
      }
    }

    const getButtonClass = (buttonValue: any) => ({ 'va-button--active': buttonValue === props.modelValue })

    const changeValue = (value: any) => emit('update:modelValue', value)

    return {
      getButtonProps,
      getButtonClass,
      changeValue,
    }
  },
})
</script>

<style lang="scss">
.va-button-toggle {
  .va-button {
    &:focus,
    &:hover {
      box-shadow: none !important;
    }
  }
}
</style>
