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
        <slot>
          <div class="va-collapse__content">
            <slot name="content" />
          </div>
        </slot>
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
    modelValue: { type: Boolean, default: undefined },
    disabled: { type: Boolean, default: false },
    header: { type: String, default: '' },
    icon: { type: String, default: '' },
    color: { type: String, default: 'transparent' },
    textColor: { type: String, default: '' },
    colorAll: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],

  setup (props, { emit, slots }) {
    const body = shallowRef<HTMLElement>()

    const [computedModelValue] = useSyncProp('modelValue', props, emit, false)

    const { getColor, getHoverColor } = useColors()
    const { accordionProps, toggle } = useAccordionItem(computedModelValue)

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
      ...pick(props, ['disabled']),
      expanded: computedModelValue.value,
      active: computedModelValue.value,
      popout: !!(accordionProps.value.popout && computedModelValue.value),
      inset: !!(accordionProps.value.inset && computedModelValue.value),
    }))

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
        color: textColorComputed.value,
        backgroundColor: props.color ? getColor(props.color) : '',
      })),

      contentStyle: computed(() => {
        return {
          visibility: bodyHeight.value > 0 ? 'visible' as const : 'hidden' as const,
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
    transition: var(--va-collapse-body-transition);
    opacity: 0;
  }

  &__content {
    padding: var(--va-collapse-padding);
  }

  &--expanded {
    .va-collapse {
      &__body {
        opacity: 1;
      }
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--va-collapse-gap);
    cursor: var(--va-collapse-header-content-cursor);
    padding: var(--va-collapse-padding);

    &__text {
      width: 100%;
      font-weight: var(--va-collapse-header-content-text-font-weight);
    }

    &__icon {
      @include flex-center();

      min-width: var(--va-collapse-header-content-icon-min-width);
      color: var(--va-collapse-header-content-icon-color);
    }

    @include keyboard-focus-outline(var(--va-collapse-header-content-border-radius));
  }

  &--popout {
    margin: var(--va-collapse-popout-margin);
  }

  &--inset {
    margin: var(--va-collapse-inset-margin);
  }

  &--disabled {
    @include va-disabled();
  }
}
</style>
