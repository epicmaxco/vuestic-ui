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
        v-if="doRenderBody"
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
import { computed, onMounted, ref, shallowRef, watch } from 'vue'
import {
  useColors, useElementTextColor,
  useBem,
  useResizeObserver,
  useComponentPresetProp,
  useStateful,
  useStatefulProps,
  useSelectableEmits,
  useComponentUuid,
} from '../../composables'
import { useAccordionItem } from '../va-accordion/hooks/useAccordion'

import { VaIcon } from '../va-icon'
import { pick } from '../../utils/pick'
import { isNilValue } from '../../utils/isNilValue'

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

const valueComputed = useStateful(props, emit, 'modelValue')

const { getColor, getTextColor, setHSLAColor } = useColors()
const { accordionProps, accordionItemValue } = useAccordionItem()

const computedModelValue = computed({
  get () {
    // If user provided value directly on VaCollapse, we use it instead of accordion value
    if (valueComputed.userProvided) {
      return valueComputed.value
    }

    if (!isNilValue(accordionItemValue)) {
      return accordionItemValue.value
    }

    return valueComputed.value
  },
  set (v) {
    if (!isNilValue(accordionItemValue)) {
      accordionItemValue.value = v
    }
    valueComputed.value = v
  },
})

if (valueComputed.userProvided && !isNilValue(accordionItemValue)) {
  accordionItemValue.value = valueComputed.value
}

const bodyHeight = ref()
useResizeObserver(body, ([body]) => {
  bodyHeight.value = body.contentRect.height ?? 0
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

const uniqueId = useComponentUuid()
const headerIdComputed = computed(() => `header-${uniqueId}`)
const panelIdComputed = computed(() => `panel-${uniqueId}`)
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
  if (isHeightChanging.value === true) { return }
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

const textColorComputed = useElementTextColor(headerBackground)

const headerStyle = computed(() => ({
  color: textColorComputed.value,
  backgroundColor: headerBackground.value,
}))

// Prevent body from rendering, to prevent tabbing into it
const doRenderBody = computed(() => {
  if (computedModelValue.value) {
    return true
  }

  if (isHeightChanging.value) {
    return true
  }

  return false
})

const contentStyle = computed(() => {
  return {
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

defineExpose({
  toggle,
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
