<template>
  <div
    class="va-input-wrapper"
    :class="wrapperClass"
    @click="$emit('click', $event)"
  >
    <div class="va-input-wrapper__size-keeper">
      <VaInputLabel
        v-if="$props.label && !$props.innerLabel"
        class="va-input-wrapper__label va-input-wrapper__label--outer"
        v-bind="vaInputLabelProps"
      />
      <div class="va-input-wrapper__container">
        <div
          v-if="$slots.prepend"
          class="va-input-wrapper__prepend-inner"
          @click="$emit('click-prepend')"
        >
          <slot name="prepend" />
        </div>

        <div class="va-input-wrapper__field">
          <div
            v-if="$slots.prependInner"
            class="va-input-wrapper__prepend-inner"
            ref="container"
            @click="$emit('click-prepend-inner', $event)"
          >
            <slot name="prependInner" />
          </div>

          <div class="va-input-wrapper__text">
            <VaInputLabel
              v-if="$props.label && $props.innerLabel"
              class="va-input-wrapper__label va-input-wrapper__label--inner"
              v-bind="vaInputLabelProps"
            />

            <slot>
              <input v-model="vModel" :placeholder="$props.placeholder" :readonly="$props.readonly" :disabled="$props.disabled" />
            </slot>
          </div>

          <va-icon
            v-if="success"
            color="success"
            name="va-check-circle"
            size="small"
            class="va-input-wrapper__icon va-input-wrapper__icon--success"
          />
          <va-icon
            v-if="error"
            color="danger"
            name="va-warning"
            size="small"
            class="va-input-wrapper__icon va-input-wrapper__icon--error"
          />
          <va-icon
            v-if="$props.loading"
            :color="$props.color"
            size="small"
            name="va-loading"
            spin="counter-clockwise"
            class="va-input-wrapper__icon va-input-wrapper__icon--loading"
          />
          <slot name="icon" />

          <div
            v-if="$slots.appendInner"
            class="va-input-wrapper__append-inner"
            @click="$emit('click-append-inner', $event)"
          >
            <slot name="appendInner" />
          </div>
        </div>

        <div
          v-if="$slots.append"
          class="va-input-wrapper__append-inner"
          @click="$emit('click-append')"
        >
          <slot name="append" />
        </div>
      </div>

      <div v-if="isCounterVisible" class="va-input-wrapper__counter-wrapper">
        <slot name="counter" v-bind="{ valueLength: counterValue, maxLength: $props.maxLength }">
          <div class="va-input-wrapper__counter">
            {{ counterComputed }}
          </div>
        </slot>
      </div>

      <slot name="messages" v-bind="{ messages: messagesComputed, errorLimit, color: messagesColor }">
        <va-message-list
          v-if="hasMessages"
          :color="messagesColor"
          :model-value="messagesComputed"
          :limit="errorLimit"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, toRef } from 'vue'
import pick from 'lodash/pick.js'

import { useBem, useFormFieldProps, useValidationProps, useColors, useTextColor, useComponentPresetProp, useSyncProp, useFocusDeep } from '../../composables'

import { VaMessageList } from './components/VaMessageList'
import VaInputLabel from './components/VaInputLabel.vue'
import { VaIcon } from '../va-icon'
import { extractComponentProps, filterComponentProps } from '../../utils/component-options'

const VaInputLabelProps = extractComponentProps(VaInputLabel)

export default defineComponent({
  name: 'VaInputWrapper',

  components: { VaMessageList, VaIcon, VaInputLabel },

  props: {
    ...useComponentPresetProp,
    ...useFormFieldProps,
    ...useValidationProps,
    ...VaInputLabelProps,
    modelValue: { type: null, default: '' },
    counter: { type: Boolean },
    maxLength: { type: Number, default: undefined },

    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    color: { type: String, default: 'primary' },
    background: { type: String },
    error: { type: Boolean, default: false },
    success: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    requiredMark: { type: Boolean, default: false },
    innerLabel: { type: Boolean, default: false },
  },

  emits: [
    'click',
    'click-prepend',
    'click-append',
    'click-prepend-inner',
    'click-append-inner',
    'update:modelValue',
  ],

  setup (props, { emit }) {
    const { getColor } = useColors()
    const [vModel] = useSyncProp('modelValue', props, emit, '')

    const isFocused = useFocusDeep()

    const counterValue = computed(() =>
      props.counter && typeof vModel.value === 'string' ? vModel.value.length : undefined,
    )

    const wrapperClass = useBem('va-input-wrapper', () => ({
      ...pick(props, ['success', 'error', 'disabled', 'readonly']),
      focused: Boolean(isFocused.value),
      labeled: Boolean(props.label),
      labeledInner: Boolean(props.label) && props.innerLabel,
    }))

    const colorComputed = computed(() => getColor(props.color))
    const backgroundComputed = computed(() => props.background ? getColor(props.background) : '#ffffff00')
    const messagesComputed = computed(() => props.error ? props.errorMessages : props.messages)

    const hasMessages = computed(() => Boolean(
      typeof messagesComputed.value === 'string' ? messagesComputed.value : messagesComputed.value?.length,
    ))

    const { textColorComputed } = useTextColor(backgroundComputed)

    const messagesColor = computed(() => {
      if (props.error) { return 'danger' }
      if (props.success) { return 'success' }
      return ''
    })

    const errorLimit = computed(() => props.error ? Number(props.errorCount) : 99)
    const isCounterVisible = computed(() => counterValue.value !== undefined)
    const counterComputed = computed(() =>
      props.maxLength !== undefined ? `${counterValue.value}/${props.maxLength}` : counterValue.value,
    )

    return {
      vModel,
      counterValue,
      vaInputLabelProps: filterComponentProps(VaInputLabelProps),
      wrapperClass,
      textColorComputed,

      isCounterVisible,
      counterComputed,
      colorComputed,
      backgroundComputed,
      messagesColor,
      messagesComputed,
      hasMessages,
      errorLimit,
    }
  },

  methods: {
    focus () { this.$el.focus() },
    blur () { this.$el.blur() },
  },
})
</script>

<style lang="scss">
@import '../../styles/resources/index.scss';
@import './variables';

@mixin parentWidthWithDefault {
  // Following behavior implements similar behavior as <input /> element has.
  // By default width is set in CSS variable.
  width: var(--va-input-wrapper-width);
  // But in case parent element has bigger width, we want to stretch input to parent width (make it bigger).
  min-width: 100%;
  // In case parent is smaller that input container, we want to stretch input container to parent width (make it smaller).
  max-width: 100%;
}

.va-input-wrapper {
  --va-input-wrapper-background: v-bind(backgroundComputed);
  --va-input-wrapper-color: v-bind(colorComputed);
  --va-input-wrapper-text-color: v-bind(textColorComputed);

  cursor: var(--va-input-wrapper-cursor);
  font-family: var(--va-font-family);
  display: inline-block;
  flex-direction: column;
  vertical-align: middle;
  min-width: auto;
  max-width: 100%;
  flex-grow: 0;
  flex-shrink: 1;

  &__size-keeper {
    @include parentWidthWithDefault();

    display: flex;
    flex-direction: column;
  }

  &__container {
    display: flex;
    align-items: center;
    gap: var(--va-input-content-items-gap);
  }

  &__field {
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    min-height: var(--va-input-wrapper-min-height);
    border-color: var(--va-input-wrapper-border-color);
    border-style: solid;
    border-width: var(--va-input-wrapper-border-width);
    border-radius: var(--va-input-wrapper-border-radius);
    padding: 0 var(--va-input-wrapper-horizontal-padding);
    gap: var(--va-input-wrapper-items-gap);
    z-index: 0;
    overflow: hidden;
    color: v-bind(textColorComputed);

    @include va-background(var(--va-input-wrapper-background), var(--va-input-wrapper-background-opacity), -1);

    input,
    textarea {
      color: inherit;
    }
  }

  & > .va-message-list {
    margin-top: 2px;
  }

  &__prepend-inner,
  &__append-inner {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
  }

  &__text {
    width: 100%;
    position: relative;
    min-height: var(--va-input-line-height);
    display: flex;
    align-items: center;
    overflow: hidden;
    caret-color: var(--va-input-wrapper-text-color);
    color: var(--va-input-wrapper-text-color);

    input {
      @include va-scroll(var(--va-input-scroll-color));

      width: 100%;
      // Use line-height as min-height for empty content slot
      min-height: var(--va-input-line-height);
      background-color: transparent;
      border-style: none;
      outline: none;
      line-height: var(--va-input-line-height);
      font-size: var(--va-input-font-size);
      font-family: inherit;
      font-weight: var(--va-input-font-weight);
      font-style: var(--va-input-font-style);
      font-stretch: var(--va-input-font-stretch);
      letter-spacing: var(--va-input-letter-spacing);
      cursor: inherit;

      &::placeholder {
        color: inherit;
        opacity: 0.5;
      }
    }
  }

  &__icons {
    display: flex;
    align-items: center;
    justify-content: center;

    &__reset {
      &:focus {
        @include focus-outline;
      }
    }
  }

  &__counter-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: var(--va-input-wrapper-counter-color);
    font-size: var(--va-input-wrapper-counter-font-size);
    line-height: var(--va-input-wrapper-counter-line-height);
  }

  &__label {
    max-width: calc(100%);
    width: 100%;
    display: block;

    &--inner {
      position: absolute;
      left: 0;
      top: 0;
      padding-top: 1px;
    }

    &--outer {
      margin-bottom: 2px;
    }
  }

  // styles
  &--labeled-inner {
    .va-input-wrapper__text {
      height: 100%;
      padding-top: 12px;
      box-sizing: content-box;
    }

    textarea {
      margin-top: 0;
    }
  }

  &--solid {
    --va-input-wrapper-border-color: var(--va-input-color);
  }

  &--bordered {
    .va-input-wrapper__field {
      border-top-left-radius: var(--va-input-wrapper-border-radius);
      border-top-right-radius: var(--va-input-wrapper-border-radius);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-left-width: 0;
      border-right-width: 0;
      border-top-width: 0;

      &::after {
        bottom: 0;
        border-color: var(--va-input-wrapper-border-color);
        border-bottom-style: solid;
      }
    }
  }

  // Validations
  &--error {
    --va-input-wrapper-border-color: var(--va-input-wrapper-error-background, var(--va-danger));
    --va-input-wrapper-background: var(--va-input-wrapper-error-background, var(--va-danger));
    --va-input-wrapper-background-opacity: var(--va-input-wrapper-validation-background-opacity);
  }

  &--success {
    --va-input-wrapper-border-color: var(--va-input-wrapper-success-background, var(--va-success));
    --va-input-wrapper-background: var(--va-input-wrapper-success-background, var(--va-success));
    --va-input-wrapper-background-opacity: var(--va-input-wrapper-validation-background-opacity);
  }

  // States
  &--focused {
    --va-input-wrapper-border-color: var(--va-input-wrapper-color);
  }

  &--readonly {
    cursor: default;
  }

  &--disabled {
    @include va-disabled;
  }
}
</style>
