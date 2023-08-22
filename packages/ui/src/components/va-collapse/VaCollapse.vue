<template>
  <div class="va-collapse" :class="computedClasses">
    <div
      class="va-collapse__header-wrapper"
      role="heading"
      @click="toggle"
      @keydown.enter="toggle"
      @keydown.space="toggle"
    >
      <slot
        name="header"
        v-bind="{
          value: computedModelValue,
          bind: headerAttributes,
          attributes: headerAttributes,
        }"
      >
        <div
          v-bind="headerAttributes"
          class="va-collapse__header"
          :style="headerStyle"
        >
          <va-icon
            v-if="icon"
            class="va-collapse__header__icon"
            :name="icon"
            :color="textColorComputed"
          />
          <slot
            name="header-content"
            v-bind="{ header }"
          >
            <div class="va-collapse__header__text">
                {{ header }}
            </div>
          </slot>
          <va-icon
            class="va-collapse__header__icon"
            :name="computedModelValue ? 'va-arrow-up' : 'va-arrow-down'"
            :color="textColorComputed"
          />
        </div>
      </slot>
    </div>
    <div class="va-collapse__body-wrapper" :style="contentStyle">
      <div
        class="va-collapse__body"
        ref="body"
        role="region"
        :id="panelIdComputed"
        :aria-labelledby="headerIdComputed"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, shallowRef } from 'vue'
import pick from 'lodash/pick.js'

import {
  useColors, useTextColor,
  useSyncProp,
  useBem,
  useResizeObserver,
  useComponentPresetProp,
  useStateful,
  useStatefulProps,
  useSelectableEmits,
} from '../../composables'
import { useAccordionItem } from '../va-accordion/hooks/useAccordion'

import { generateUniqueId } from '../../utils/uuid'

import { VaIcon } from '../va-icon'

export default defineComponent({
  name: 'VaCollapse',
  components: {
    VaIcon,
  },
  props: {
    ...useComponentPresetProp,
    ...useStatefulProps,
    modelValue: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    header: { type: String, default: '' },
    icon: { type: String, default: '' },
    solid: { type: Boolean, default: false },
    color: { type: String, default: 'background-element' },
    bodyColor: { type: String, default: undefined },
    textColor: { type: String, default: '' },
    colorAll: { type: Boolean, default: false },
    flat: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', ...useSelectableEmits],

  setup (props, { emit, slots }) {
    const body = shallowRef<HTMLElement>()

    const { valueComputed } = useStateful(props, emit, 'modelValue', { defaultValue: false })

    const { getColor, getHoverColor } = useColors()
    const { accordionProps, valueProxy: computedModelValue = valueComputed } = useAccordionItem()

    const { textColorComputed } = useTextColor()

    const bodyHeight = ref()
    useResizeObserver([body], () => {
      bodyHeight.value = body.value?.clientHeight ?? 0
    })

    const height = computed(() => computedModelValue.value ? bodyHeight.value : 0)

    const getTransition = () => {
      const duration = height.value / 1000 * 0.2
      return `${duration > 0.2 ? duration : 0.2}s`
    }

    const getBackground = () => {
      if (props.bodyColor) {
        return getColor(props.bodyColor)
      }

      return props.color && props.colorAll
        ? getHoverColor(getColor(props.color))
        : ''
    }

    const uniqueId = computed(generateUniqueId)
    const headerIdComputed = computed(() => `header-${uniqueId.value}`)
    const panelIdComputed = computed(() => `panel-${uniqueId.value}`)
    const tabIndexComputed = computed(() => props.disabled ? -1 : 0)

    const headerAttributes = computed(() => ({
      id: headerIdComputed.value,
      tabindex: tabIndexComputed.value,
      'aria-controls': panelIdComputed.value,
      'aria-expanded': computedModelValue.value,
      'aria-disabled': props.disabled,
      role: 'button',
    }))

    const computedClasses = useBem('va-collapse', () => ({
      ...pick(props, ['disabled', 'solid', 'flat']),
      expanded: computedModelValue.value,
      active: props.solid && computedModelValue.value,
      popout: !!(accordionProps.value.popout && computedModelValue.value),
      inset: !!(accordionProps.value.inset && computedModelValue.value),
    }))

    const toggle = () => {
      if (props.disabled) { return }
      computedModelValue.value = !computedModelValue.value
    }

    return {
      body,
      height,

      toggle,
      computedModelValue,

      headerIdComputed,
      headerAttributes,
      panelIdComputed,
      tabIndexComputed,

      textColorComputed,
      computedClasses,

      headerStyle: computed(() => ({
        paddingLeft: props.icon && 0,
        color: textColorComputed.value,
        backgroundColor: props.color ? getColor(props.color) : '',
      })),

      contentStyle: computed(() => {
        return {
          visibility: computedModelValue.value ? 'visible' as const : 'hidden' as const,
          height: `${height.value}px`,
          transitionDuration: getTransition(),
          background: computedModelValue.value ? getBackground() : '',
        }
      }),
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-collapse {
  transition: var(--va-collapse-transition, var(--va-swing-transition));
  font-family: var(--va-font-family);

  &__body-wrapper {
    transition: var(--va-collapse-body-wrapper-transition);
    overflow: hidden;
  }

  &__body {
    top: 0;
    left: 0;
    width: var(--va-collapse-body-width);
  }

  &__header {
    display: var(--va-collapse-header-content-display);
    justify-content: var(--va-collapse-header-content-justify-content);
    cursor: var(--va-collapse-header-content-cursor);
    background-color: var(--va-collapse-header-content-background-color);
    box-shadow: var(--va-collapse-header-content-box-shadow, var(--va-block-box-shadow));
    border-radius: var(--va-collapse-header-content-border-radius, var(--va-block-border-radius));
    align-items: var(--va-collapse-header-content-align-items);
    padding-top: var(--va-collapse-header-content-padding-top);
    padding-bottom: var(--va-collapse-header-content-padding-bottom);
    padding-left: var(--va-collapse-header-content-padding-left);

    &__text {
      width: var(--va-collapse-header-content-text-width);
      font-weight: var(--va-collapse-header-content-text-font-weight);
    }

    &__icon {
      @include flex-center();

      min-width: var(--va-collapse-header-content-icon-min-width);
      margin-left: var(--va-collapse-header-content-icon-margin-left);
      margin-right: var(--va-collapse-header-content-icon-margin-right);
      color: var(--va-collapse-header-content-icon-color);
    }

    @include keyboard-focus-outline(var(--va-collapse-header-content-border-radius));
  }

  &--solid {
    box-shadow: var(--va-collapse-solid-box-shadow);
    border-radius: var(--va-collapse-solid-border-radius);

    .va-collapse {
      &__header {
        border-radius: var(--va-collapse-solid-header-content-border-radius, var(--va-block-border-radius));
        transition: var(--va-collapse-solid-header-content-transition);
        box-shadow: var(--va-collapse-solid-header-content-box-shadow, var(--va-block-box-shadow));
        background-color: var(--va-collapse-solid-header-content-background-color);
      }

      &__body-wrapper {
        border-radius: var(--va-collapse-solid-border-radius);
      }

      &__body {
        border-radius: var(--va-collapse-solid-body-border-radius);
        margin-top: var(--va-collapse-solid-body-margin-top);
      }
    }
  }

  &--popout {
    margin: var(--va-collapse-popout-margin);
  }

  &--inset {
    margin: var(--va-collapse-inset-margin);
  }

  &--flat {
    .va-collapse__header {
      --va-collapse-solid-header-content-border-radius: 0;
      --va-collapse-header-content-box-shadow: none;
    }
  }

  &--disabled {
    @include va-disabled();
  }
}
</style>
