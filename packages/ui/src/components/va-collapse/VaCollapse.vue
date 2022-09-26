<template>
  <div class="va-collapse" :class="computedClasses">
    <div
      class="va-collapse__header-wrapper"
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
          <div class="va-collapse__header__text">
            {{ header }}
          </div>
          <va-icon
            class="va-collapse__header__icon"
            :name="computedModelValue ? 'expand_less' : 'expand_more'"
            :color="textColorComputed"
          />
        </div>
      </slot>
    </div>
    <div class="va-collapse__body-wrapper" :style="contentStyle">
      <div
        class="va-collapse_body"
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
} from '../../composables'
import { useAccordionItem } from '../va-accordion/hooks/useAccordion'

import { generateUniqueId } from '../../services/utils'

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
    solid: { type: Boolean, default: false },
    color: { type: String, default: 'background-secondary' },
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
      ...pick(props, ['disabled', 'solid']),
      expanded: computedModelValue.value,
      active: props.solid && computedModelValue.value,
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
        paddingLeft: props.icon && 0,
        color: textColorComputed.value,
        backgroundColor: props.color ? getColor(props.color) : '',
      })),

      contentStyle: computed(() => {
        const hasContent = computedModelValue.value && !!slots.default?.()[0]

        return {
          visibility: hasContent ? 'visible' as const : 'hidden' as const,
          height: `${height.value}px`,
          transitionDuration: getTransition(),
          background: hasContent ? getBackground() : '',
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
      position: relative;
      transition: var(--va-collapse-body-transition);
      overflow: hidden;
    }

    &__body {
      position: absolute;
      top: 0;
      left: 0;
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

    &--disabled {
      @include va-disabled();
    }
  }
</style>
