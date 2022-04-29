<template>
  <div
    class="va-input-wrapper"
    :class="wrapperClass"
    @click="$emit('click', $event)"
  >
    <div class="va-input-wrapper__input">
      <div
        v-if="$slots.prepend"
        class="va-input-wrapper__prepend-inner"
        @click="$emit('click-prepend')"
      >
        <slot name="prepend" />
      </div>

      <div class="va-input-wrapper__content">
        <div
          class="va-input__container"
          ref="container"
          :style="{ borderColor: borderColorComputed }"
        >
          <div
            v-if="$slots.prependInner"
            class="va-input__prepend-inner"
            @click="$emit('click-prepend-inner', $event)"
          >
            <slot name="prependInner" />
          </div>

          <div class="va-input__content-wrapper">
            <div class="va-input__content">
              <label
                v-if="label"
                aria-hidden="true"
                class="va-input__label"
                :style="{ color: colorComputed }"
              >
                {{ label }}
                <span
                  v-if="requiredMark"
                  class="va-input__required-mark"
                >
                  *
                </span>
              </label>

              <div v-if="$slots.content" class="va-input__content__input">
                <slot name="content" />
              </div>

              <slot />
            </div>
          </div>

          <div
            v-if="$slots.icon"
            class="va-input__icons"
            @click="$emit('click-icon', $event)"
          >
            <slot name="icon" />
          </div>

          <div
            v-if="$slots.appendInner"
            class="va-input__append-inner"
            @click="$emit('click-append-inner', $event)"
          >
            <slot name="appendInner" />
          </div>
        </div>

        <div
          v-if="bordered"
          class="va-input--bordered__border"
          :style="{ borderColor: borderColorComputed }"
        />
      </div>

      <div
        v-if="$slots.append"
        class="va-input-wrapper__append-inner"
        @click="$emit('click-append')"
      >
        <slot name="append" />
      </div>
    </div>

    <div class="va-input-wrapper__message-list-wrapper">
      <slot name="messages" v-bind="{ messages: messagesComputed, errorLimit, color: messagesColor }">
        <va-message-list
          :color="messagesColor"
          :model-value="messagesComputed"
          :limit="errorLimit"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useBem } from '../../../composables/useBem'
import { useFormProps } from '../../../composables/useForm'
import { useValidationProps } from '../../../composables/useValidation'
import { getColor } from '../../../services/color-config/color-config'
import VaMessageList from './VaMessageList'

export default defineComponent({
  name: 'VaInputWrapper',

  components: { VaMessageList },

  props: {
    ...useFormProps,
    ...useValidationProps,

    label: { type: String, default: '' },
    color: { type: String, default: 'primary' },
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
    'click-icon',
  ],

  setup (props) {
    const { createModifiersClasses } = useBem('va-input')

    const colorComputed = computed(() => getColor(props.color))

    return {
      wrapperClass: createModifiersClasses(() => ({
        outline: props.outline,
        bordered: props.bordered,
        solid: !props.outline && !props.bordered,
        disabled: props.disabled,
        readonly: props.readonly,
        labeled: !!props.label,
        success: props.success,
        focused: props.focused,
        error: props.error,
      })),

      colorComputed,
      borderColorComputed: computed(() => props.focused ? colorComputed.value : undefined),

      messagesColor: computed(() => {
        if (props.error) { return 'danger' }
        if (props.success) { return 'success' }

        return ''
      }),
      messagesComputed: computed(() => props.error ? props.errorMessages : props.messages),
      errorLimit: computed(() => props.error ? props.errorCount : 99),
    }
  },
})
</script>

<style lang="scss">
@import '../../../styles/resources/index.scss';
@import '../variables';

.va-input {
  position: relative;
  color: var(--va-input-text-color);
  cursor: var(--va-input-cursor);
  font-family: var(--va-font-family);

  &--readonly {
    cursor: default;
  }

  &--disabled {
    @include va-disabled;
  }

  &__container {
    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    min-height: var(--va-input-min-height);
    border-color: var(--va-input-color);
    border-style: solid;
    border-width: var(--va-input-border-width);
    overflow: hidden;
    padding: 0 var(--va-input-content-horizontal-padding);

    /* Creates gap between prepend, content, validation icons, append */
    & > * {
      padding-right: var(--va-input-content-items-gap);
      line-height: 0;

      &:last-child {
        padding-right: 0;
      }
    }
  }

  &-wrapper__input {
    display: flex;
    align-items: center;
  }

  &-wrapper__message-list-wrapper {
    margin-top: 2px;
  }

  &-wrapper__content {
    position: relative;
    flex-grow: 1;
  }

  &-wrapper__prepend-inner,
  &-wrapper__append-inner,
  &__prepend-inner,
  &__append-inner {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
  }

  &__content-wrapper {
    width: stretch;
    display: flex;
    align-items: center;

    .va-input__content {
      width: 100%;
      position: relative;

      input {
        cursor: inherit;
      }

      &__input {
        @include va-scroll(var(--va-input-scroll-color));

        width: 100%;
        // Use line-height as min-height for empty content slot
        min-height: var(--va-input-line-height);
        color: var(--va-input-text-color);
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

        &::-webkit-scrollbar {
          width: 10px;
        }

        &::placeholder {
          color: var(--va-input-placeholder-text-color);
        }

        &:disabled {
          opacity: var(--va-input-disabled-opacity);
        }
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
  }

  &__required-mark {
    transform: translate(0, -2px);
    color: var(--va-danger);
    font-size: 18px;
    font-weight: var(--va-input-container-label-font-weight);
  }

  textarea {
    margin: 12px 0;
    resize: vertical;
  }

  &--labeled {
    .va-input__content-wrapper {
      height: 100%;
      padding-top: 12px;
      align-items: flex-end;
    }

    .va-input__label {
      @include va-ellipsis();

      height: 12px;
      transform: translateY(-100%);
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      padding-top: 1px;
      max-width: var(--va-input-container-label-max-width);
      color: var(--va-input-container-label-color);
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

  /* We have 3 styles and two states for each style separately */
  &--solid {
    .va-input__container {
      background: var(--va-input-color);
      border-color: var(--va-input-color);
      border-radius: var(--va-input-border-radius);
    }

    &.va-input--success {
      .va-input__container {
        background: var(--va-input-success-background);
        border-color: var(--va-input-success-color);
      }
    }

    &.va-input--error {
      .va-input__container {
        background: var(--va-input-error-background);
        border-color: var(--va-input-error-color);
      }
    }
  }

  &--outline {
    .va-input__container {
      border-radius: 0;
      border-color: var(--va-input-bordered-color);
    }

    &.va-input--success {
      .va-input__container {
        background: var(--va-input-success-background);
        border-color: var(--va-input-success-color);
      }
    }

    &.va-input--error {
      .va-input__container {
        background: var(--va-input-error-background);
        border-color: var(--va-input-error-color);
      }
    }
  }

  &--bordered {
    /*
      We can not just set border-bottom, because we also have border on the other sides.
      We also can not use after or before, because we need to set border-color according to
      color prop
    */
    &__border {
      border-color: var(--va-input-bordered-color);
      position: absolute;
      height: 0;
      border-bottom-width: var(--va-input-border-width);
      border-bottom-style: solid;
      width: 100%;
      bottom: 0;
    }

    .va-input__container {
      background: var(--va-input-color);
      border-top-left-radius: var(--va-input-border-radius);
      border-top-right-radius: var(--va-input-border-radius);
      border-color: transparent !important;
    }

    &.va-input--success {
      .va-input__container {
        background: var(--va-input-success-background);
      }

      .va-input_bordered__border {
        border-color: var(--va-input-success-color);
      }
    }

    &.va-input--error {
      .va-input__container {
        background: var(--va-input-error-background);
      }

      .va-input_bordered__border {
        border-color: var(--va-input-error-color);
      }
    }
  }
}
</style>
