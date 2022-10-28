<template>
  <div
    class="va-input-wrapper"
    :class="wrapperClass"
    :style="wrapperStyle"
    @click="$emit('click', $event)"
  >
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
          class="va-input__container"
          ref="container"
          :style="containerStyle"
          @click="$emit('click-prepend-inner', $event)"
        >
          <slot name="prependInner" />
        </div>

        <div class="va-input-wrapper__text">
          <label
            v-if="label"
            aria-hidden="true"
            class="va-input-wrapper__label"
            :style="{ color: colorComputed }"
          >
            {{ label }}
            <span
              v-if="requiredMark"
              class="va-input-wrapper__required-mark"
            >
              *
            </span>
          </label>

          <slot />
        </div>

        <va-icon
          v-if="success"
          color="success"
          name="va-check-circle"
          size="small"
        />
        <va-icon
          v-if="error"
          color="danger"
          name="va-warning"
          size="small"
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

    <div v-if="isCounterVisible" class="va-input-wrapper__bottom">
      <slot name="counter" v-bind="{ valueLength: $props.counterValue, maxLength: $props.maxLength }">
        <div class="va-input-wrapper__bottom-counter">
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
</template>

<script lang="ts">
import { computed, defineComponent, toRef } from 'vue'
import pick from 'lodash/pick.js'

import { useBem, useFormProps, useValidationProps, useColors, useTextColor, useCSSVariables } from '../../../../composables'

import { VaMessageList } from '../VaMessageList'
import { VaIcon } from '../../../va-icon'

export default defineComponent({
  name: 'VaInputWrapper',

  components: { VaMessageList, VaIcon },

  props: {
    ...useFormProps,
    ...useValidationProps,
    counterValue: { type: Number, default: undefined },
    maxLength: { type: Number, default: undefined },

    label: { type: String, default: '' },
    color: { type: String, default: 'primary' },
    background: { type: String, default: 'background-element' },
    outline: { type: Boolean, default: false },
    bordered: { type: Boolean, default: false },
    focused: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    success: { type: Boolean, default: false },
    requiredMark: { type: Boolean, default: false },
  },

  emits: [
    'click',
    'click-prepend',
    'click-append',
    'click-prepend-inner',
    'click-append-inner',
  ],

  setup (props) {
    const { getColor } = useColors()

    const wrapperClass = useBem('va-input-wrapper', () => ({
      ...pick(props, ['outline', 'bordered', 'success', 'focused', 'error', 'disabled', 'readonly']),
      labeled: !!props.label,
      solid: !props.outline && !props.bordered,
    }))

    const wrapperStyle = useCSSVariables('va-input-wrapper', () => ({
      color: colorComputed.value,
    }))

    const colorComputed = computed(() => getColor(props.color))
    const borderColorComputed = computed(() => props.focused ? colorComputed.value : undefined)

    const messagesComputed = computed(() => props.error ? props.errorMessages : props.messages)

    const hasMessages = computed(() => Boolean(
      typeof messagesComputed.value === 'string' ? messagesComputed.value : messagesComputed.value?.length,
    ))

    const { textColorComputed } = useTextColor(toRef(props, 'background'))

    const containerStyle = computed(() => ({
      color: textColorComputed.value,
      'caret-color': textColorComputed.value,
      '--va-input-color': props.background ? getColor(props.background) : undefined,
      borderColor: borderColorComputed.value,
    }))

    const messagesColor = computed(() => {
      if (props.error) { return 'danger' }
      if (props.success) { return 'success' }
      return ''
    })

    const errorLimit = computed(() => props.error ? Number(props.errorCount) : 99)
    const isCounterVisible = computed(() => props.counterValue !== undefined)
    const counterComputed = computed(() =>
      props.maxLength !== undefined ? `${props.counterValue}/${props.maxLength}` : props.counterValue,
    )

    return {
      containerStyle,
      wrapperClass,
      wrapperStyle,
      textColorComputed,

      isCounterVisible,
      counterComputed,
      colorComputed,
      borderColorComputed,
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
@import '../../../../styles/resources/index.scss';
@import '../../variables';
@import './variables';

.va-input-wrapper {
  position: relative;
  cursor: var(--va-input-cursor);
  font-family: var(--va-font-family);
  display: var(--va-input-wrapper-display);
  vertical-align: var(--va-input-wrapper-vertical-align);
  min-width: var(--va-input-wrapper-min-width);
  max-width: 100%;
  flex: 1;

  &__field {
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    min-height: var(--va-input-min-height);
    width: var(--va-form-element-default-width);
    border-color: var(--va-input-wrapper-border-color);
    border-style: solid;
    border-width: var(--va-input-border-width);
    padding: 0 var(--va-input-content-horizontal-padding);
    z-index: 0;
    overflow: hidden;

    @include va-background(var(--va-input-color), null, -1);

    /* Creates gap between prepend, content, validation icons, append */
    & > * {
      padding-right: var(--va-input-content-items-gap);
      line-height: 0;

      &:last-child {
        padding-right: 0;
      }
    }

    input,
    textarea {
      color: v-bind(textColorComputed);
    }
    // TODO: Choose va-background
    @include va-background(var(--va-input-wrapper-background), var(--va-input-wrapper-background-opacity), -1);
  }

  &__container {
    display: flex;
    align-items: center;
  }

  // Creates gap between prepend, content, validation icons, append
  &__field > *,
  &__container > * {
    margin-right: var(--va-input-content-items-gap);

    &:last-child {
      margin-right: 0;
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

    input,
    textarea {
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
      transform: translateY(-1px);
      cursor: inherit;

      &::-webkit-scrollbar {
        width: 10px;
      }

      &::placeholder {
        color: var(--va-input-placeholder-text-color);
      }
    }
  }

  &__icons {
    display: flex;
    align-items: center;
    justify-content: center;

    & > * {
      margin-right: calc(var(--va-input-content-items-gap) / 4);

      &:last-child {
        margin-right: 0;
      }
    }

    &__reset {
      &:focus {
        @include focus-outline;
      }
    }
  }

  &__required-mark {
    transform: translate(0, -2px);
    color: var(--va-danger);
    font-size: 18px;
    font-weight: var(--va-input-container-label-font-weight);
  }

  &__bottom {
    display: var(--va-input-wrapper-bottom-display);
    align-items: var(--va-input-wrapper-bottom-align-items);
    color: var(--va-input-wrapper-bottom-color);
    font-size: var(--va-input-wrapper-bottom-font-size);
    line-height: var(--va-input-wrapper-bottom-line-height);

    &-counter {
      color: var(--va-input-wrapper-counter-color);
      flex: var(--va-input-wrapper-counter-flex);
      margin-left: var(--va-input-wrapper-counter-margin-left);
    }
  }

  textarea {
    margin: 12px 0;
    resize: vertical;
  }

  // styles
  &--labeled {
    .va-input-wrapper__text {
      height: 100%;
      padding-top: 12px;
      box-sizing: content-box;
    }

    .va-input-wrapper__label {
      @include va-ellipsis();

      height: 12px;
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      padding-top: 1px;
      max-width: var(--va-input-container-label-max-width);
      font-size: var(--va-input-container-label-font-size);
      letter-spacing: var(--va-input-container-label-letter-spacing, var(--va-letter-spacing));
      line-height: var(--va-input-container-label-line-height);
      font-weight: var(--va-input-container-label-font-weight);
      text-transform: var(--va-input-container-label-text-transform);
      transform-origin: top left;
    }

    textarea {
      margin-top: 0;
    }
  }

  &--solid {
    --va-input-wrapper-border-color: var(--va-input-color);

    .va-input-wrapper__field {
      border-radius: var(--va-input-border-radius);
    }
  }

  &--outline {
    .va-input-wrapper__field {
      border-radius: 0;
    }
  }

  &--bordered {
    &::after {
      content: '';
      border-color: var(--va-input-wrapper-border-color);
      position: absolute;
      height: 0;
      border-bottom-width: var(--va-input-border-width);
      border-bottom-style: solid;
      width: 100%;
      bottom: 0;
    }

    .va-input-wrapper__field {
      border-top-left-radius: var(--va-input-border-radius);
      border-top-right-radius: var(--va-input-border-radius);
      border-color: transparent !important;
    }
  }

  // Validations
  &--error {
    --va-input-wrapper-border-color: var(--va-input-error-color, --va-danger);
    --va-input-wrapper-background: var(--va-input-error-color, --va-danger);
    --va-input-wrapper-background-opacity: var(--va-input-opacity);
  }

  &--success {
    --va-input-wrapper-border-color: var(--va-input-success-color, --va-success);
    --va-input-wrapper-background: var(--va-input-success-color, --va-success);
    --va-input-wrapper-background-opacity: var(--va-input-opacity);
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
