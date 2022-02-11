<template>
  <VaInputWrapper
    class="va-counter"
    v-bind="fieldListeners"
    :class="$attrs.class"
    :style="$attrs.style"
    :color="color"
    :readonly="readonly"
    :disabled="disabled"
    :messages="$props.messages"
    :label="label"
    :bordered="bordered"
    :outline="outline"
    :focused="isFocused"
    @click="focus()"
  >
    <template
      v-for="name in filterSlots"
      :key="name"
      v-slot:[name]="slotScope"
    >
      <slot :name="name" v-bind="slotScope" />
    </template>

    <template #icon="slotScope">
      <slot name="icon" v-bind="slotScope" />
    </template>

    <input
      v-if="!$slots.content"
      class="va-input__content__input"
      ref="input"
      type="number"
      v-bind="{ ...computedInputAttributes, ...inputListeners }"
      :value="$props.modelValue"
      @input="onManualInput($event.target.value)"
    >
  </VaInputWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, InputHTMLAttributes, ref, PropType } from 'vue'
import { useFormProps } from '../../composables/useForm'
import { useEmitProxy } from '../../composables/useEmitProxy'
import { useFocus, useFocusEmits } from '../../composables/useFocus'
import { useSyncProp } from '../../composables/useSyncProp'
import VaInputWrapper from '../va-input/components/VaInputWrapper.vue'
// import VaIcon from '../va-icon/VaIcon.vue'
import { omit, pick } from 'lodash-es'

const { createEmits: createInputEmits, createListeners: createInputListeners } = useEmitProxy(
  ['change', 'change', 'keyup', 'keypress', 'keydown', 'focus', 'blur'],
)

const { createEmits: createFieldEmits, createListeners: createFieldListeners } = useEmitProxy([
  'click',
  'click-prepend',
  'click-append',
  'click-prepend-inner',
  'click-append-inner',
  'click-icon',
])

export default defineComponent({
  name: 'VaCounter',

  components: { VaInputWrapper },

  props: {
    ...useFormProps,

    // input
    modelValue: { type: [String, Number], default: '' },
    label: { type: String, default: '' },

    // hint
    messages: { type: [Array, String] as PropType<string[] | string>, default: () => [] },

    // style
    color: { type: String, default: 'primary' },
    outline: { type: Boolean, default: false },
    bordered: { type: Boolean, default: false },
  },

  emits: [
    'update:modelValue',
    ...createInputEmits(),
    ...createFieldEmits(),
    ...useFocusEmits,
  ],

  inheritAttrs: false,

  setup (props, { emit, attrs, slots }) {
    const input = ref<HTMLInputElement | undefined>()

    const {
      isFocused,
      onFocus,
      onBlur,
      // focus,
      // blur,
    } = useFocus(input, emit)

    const [modelValueSync] = useSyncProp('modelValue', props, emit)

    const onManualInput = (count: string) => {
      // check min and max
      modelValueSync.value = count
    }

    const filterSlots = computed(() => {
      const iconSlot = ['icon']
      return Object.keys(slots).filter(slot => !iconSlot.includes(slot))
    })

    const inputListeners = {
      ...createInputListeners(emit),
      onFocus,
      onBlur,
    }

    const computedInputAttributes = computed(() => ({
      ariaLabel: props.label,
      ...omit(attrs, ['class', 'style']),
      ...pick(props, ['disabled', 'readonly']),
    }) as InputHTMLAttributes)

    return {
      input,
      isFocused,
      // modelValueSync,

      inputListeners,
      computedInputAttributes,

      fieldListeners: createFieldListeners(emit),
      filterSlots,
      onManualInput,

      // while we have problem with 'withConfigTransport'
      // focus,
      // blur,
    }
  },

  // we will use this while we have problem with 'withConfigTransport'
  methods: {
    focus () { this.input?.focus() },
    blur () { this.input?.blur() },
  },
})
</script>

<style lang="scss">
.va-input__content__input {
  text-align: center;

  // Chrome, Safari, Edge, Opera
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  // Firefox
  [type=number] {
    -moz-appearance: textfield;
  }
}
</style>
