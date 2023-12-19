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
          attrs: headerAttributes,
          iconAttrs: {
            class: [
              'va-collapse__expand-icon',
              computedModelValue ? 'a-collapse__expand-icon--expanded' : 'a-collapse__expand-icon--collapsed'
            ]
          },
          text: header,
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
          />
          <slot
            name="header-content"
            v-bind="{ header }"
          >
            <div class="va-collapse__header__text">
              {{ header }}
            </div>
          </slot>
          <slot name="expand-icon">
            <va-icon
              class="va-collapse__expand-icon"
              name="va-arrow-down"
              :class="computedModelValue ? 'va-collapse__expand-icon--expanded' : 'va-collapse__expand-icon--collapsed'"
            />
          </slot>
        </div>
      </slot>
    </div>
    <div
      class="va-collapse__body-wrapper"
      :class="{
        'va-collapse__body-wrapper--bordered': !$slots.body && !$slots.header,
      }"
      :style="contentStyle"
      @transitionend="onTransitionEnd"
    >
      <div
        class="va-collapse__body"
        ref="body"
        role="region"
        :id="panelIdComputed"
        :aria-labelledby="headerIdComputed"
      >
        <slot name="body">
          <div class="va-collapse__content">
            <slot name="default">
              <slot name="content" />
            </slot>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, shallowRef, watch } from 'vue'
import pick from 'lodash/pick.js'

import {
  useColors, useTextColor,
  useBem,
  useResizeObserver,
  useComponentPresetProp,
  isColorTransparent,
  useStateful,
  useStatefulProps,
  useSelectableEmits,
} from '../../composables'
import { useAccordionItem } from '../va-accordion/hooks/useAccordion'

import { generateUniqueId } from '../../utils/uuid'

import { VaIcon } from '../va-icon'

defineOptions({
  name: 'VaCollapse',
})

const props = defineProps({
  ...useComponentPresetProp,
  ...useStatefulProps,
  modelValue: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  header: { type: String, default: '' },
  icon: { type: String, default: '' },
  color: { type: String, default: undefined },
  bodyColor: { type: String, default: undefined },
  textColor: { type: String, default: '' },
  bodyTextColor: { type: String, default: '' },
  iconColor: { type: String, default: 'secondary' },
  colorAll: { type: Boolean, default: false },
  stateful: { type: Boolean, default: true },
})

const emit = defineEmits(['update:modelValue', ...useSelectableEmits])

const body = shallowRef<HTMLElement>()

const { valueComputed } = useStateful(props, emit, 'modelValue')

const { getColor, getTextColor, setHSLAColor } = useColors()
const { accordionProps, valueProxy: computedModelValue = valueComputed } = useAccordionItem()

const bodyHeight = ref()
useResizeObserver([body], () => {
  bodyHeight.value = body.value?.clientHeight ?? 0
})

const height = computed(() => computedModelValue.value ? bodyHeight.value : 0)

const getTransition = () => {
  const duration = height.value / 1000 * 0.2
  return `${duration > 0.2 ? duration : 0.2}s`
}

const contentBackground = computed(() => {
  if (props.bodyColor) {
    return getColor(props.bodyColor)
  }

  return props.color && props.colorAll
    ? setHSLAColor(getColor(props.color), { a: 0.07 })
    : undefined
})

const headerBackground = computed(() => {
  return props.color ? getColor(props.color) : undefined
})

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

const isHeightChanging = ref(false)

watch(height, (newValue, oldValue) => {
  // If no transition happened, just got initial height value
  if (oldValue === undefined) { return }
  isHeightChanging.value = true
})

const onTransitionEnd = (e: TransitionEvent) => {
  if (e.propertyName === 'height' && e.target === e.currentTarget) {
    isHeightChanging.value = false
  }
}

const computedClasses = useBem('va-collapse', () => ({
  ...pick(props, ['disabled']),
  expanded: computedModelValue.value,
  active: computedModelValue.value,
  popout: !!(accordionProps.value.popout && computedModelValue.value),
  inset: !!(accordionProps.value.inset && computedModelValue.value),
  'height-changing': isHeightChanging.value,
  'colored-body': Boolean(contentBackground.value),
  'colored-header': Boolean(headerBackground.value),
}))

const toggle = () => {
  if (props.disabled) { return }
  computedModelValue.value = !computedModelValue.value
}

const { textColorComputed } = useTextColor(headerBackground)

const headerStyle = computed(() => ({
  color: textColorComputed.value,
  backgroundColor: headerBackground.value,
}))

const contentStyle = computed(() => {
  return {
    visibility: bodyHeight.value > 0 ? 'visible' as const : 'hidden' as const,
    height: `${height.value}px`,
    transitionDuration: getTransition(),
    background: computedModelValue.value ? contentBackground.value : '',
    color: props.bodyTextColor
      ? getColor(props.bodyTextColor)
      : contentBackground.value
        ? getColor(getTextColor(contentBackground.value))
        : 'currentColor',
  }
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-collapse {
  transition: var(--va-collapse-transition, var(--va-swing-transition));
  font-family: var(--va-font-family);
  display: flex;
  flex-direction: column;

  &__body-wrapper {
    transition: var(--va-collapse-body-wrapper-transition);
    overflow: auto;

    &--bordered {
      border-bottom: 1px solid var(--va-background-border);
      box-sizing: content-box;

      .va-collapse--colored-header:not(.va-collapse--expanded) & {
        border-bottom: none;
      }

      .va-collapse--colored-body.va-collapse--expanded & {
        border-bottom: none;
      }
    }
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
    padding-top: calc(var(--va-collapse-padding) / 1.5);
    box-sizing: border-box;

    &:empty {
      padding: 0;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--va-collapse-gap);
    cursor: var(--va-collapse-header-content-cursor);
    padding: var(--va-collapse-padding);
    transition: all 0.2s ease-in-out;

    &__text {
      width: 100%;
      font-weight: var(--va-collapse-header-content-text-font-weight);
    }

    @include keyboard-focus-outline(var(--va-collapse-header-content-border-radius));
  }

  &--expanded {
    .va-collapse {
      &__body {
        opacity: 1;
      }
    }
  }

  &__expand-icon {
    transition: var(--va-collapse-expand-icon-transition);

    &--expanded {
      transform: rotate(180deg);
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

  &--height-changing {
    .va-collapse {
      &__body-wrapper {
        overflow: hidden;
      }
    }
  }
}
</style>
