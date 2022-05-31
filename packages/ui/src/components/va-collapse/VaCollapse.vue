<template>
  <div class="va-collapse" :class="computedClasses">
    <div
      class="va-collapse__header"
      v-on="keyboardFocusListeners"
      @click="toggle()"
      @focus="$emit('focus')"
      @keydown.enter="toggle()"
      @keydown.space="toggle()"
      :tabindex="disabled ? -1 : 0"
      role="button"
      :aria-expanded="computedModelValue"
      :id="headerIdComputed"
      :aria-controls="panelIdComputed"
      :aria-disabled="disabled"
    >
      <slot
        name="header"
        v-bind="{
          value: computedModelValue,
          hasKeyboardFocus: hasKeyboardFocus
        }"
      >
        <div
          class="va-collapse__header__content"
          :style="headerStyle"
        >
          <va-icon
            v-if="icon"
            class="va-collapse__header__icon"
            :name="icon"
            :color="textColorComputed"
            aria-hidden="true"
          />
          <div class="va-collapse__header__text">
            {{ header }}
          </div>
          <va-icon
            class="va-collapse__header__icon"
            :name="computedModelValue ? 'expand_less' : 'expand_more'"
            :color="textColorComputed"
            aria-hidden="true"
          />
        </div>
      </slot>
    </div>
    <div
      class="va-collapse__body"
      ref="body"
      :style="contentStyle"
      :id="panelIdComputed"
      :aria-labelledby="headerIdComputed"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import VaIcon from '../va-icon'
import { useColors } from '../../composables/useColor'
import { computed, defineComponent, shallowRef } from 'vue'
import useKeyboardOnlyFocus from '../../composables/useKeyboardOnlyFocus'
import { useAccordionItem } from '../va-accordion/hooks/useAccordion'
import { useSyncProp } from '../../composables/useSyncProp'
import { useTextColor } from '../../composables/useTextColor'
import { generateUniqueId } from '../../services/utils'

export default defineComponent({
  name: 'VaCollapse',
  components: {
    VaIcon,
  },
  props: {
    modelValue: { type: Boolean, default: undefined },
    disabled: { type: Boolean, default: false },
    header: { type: String, default: '' },
    icon: { type: String, default: '' },
    solid: { type: Boolean, default: false },
    color: { type: String, default: 'background' },
    textColor: { type: String, default: '' },
    colorAll: { type: Boolean, default: false },
  },
  emits: ['focus', 'update:modelValue'],

  setup (props, { emit, slots }) {
    const body = shallowRef<HTMLElement | null>(null)
    const [computedModelValue] = useSyncProp('modelValue', props, emit, false)

    const { getColor, getHoverColor } = useColors()
    const { accordionProps, toggle } = useAccordionItem(computedModelValue)

    const { textColorComputed } = useTextColor()

    const getTextNodeHeight = (textNode: Node) => {
      const range = document.createRange()
      range.selectNodeContents(textNode)
      const rect = range.getBoundingClientRect()

      return rect.bottom - rect.top
    }

    const getNodeHeight = (node: Node) => {
      // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName
      if (node.nodeName === '#text') { return getTextNodeHeight(node) }
      if (node.nodeName === '#comment') { return 0 }

      return (node as Element).clientHeight
    }

    const height = computed(() => {
      if (!computedModelValue.value || !body.value) { return 0 }

      const nodes = Array.from(body.value.childNodes) as HTMLElement[]
      return nodes.reduce((result: number, node: HTMLElement) => result + getNodeHeight(node), 0)
    })

    const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus()

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

    return {
      body,
      height,

      toggle,
      computedModelValue,

      hasKeyboardFocus,
      keyboardFocusListeners,

      textColorComputed,

      headerIdComputed,
      panelIdComputed,

      computedClasses: computed(() => ({
        'va-collapse--disabled': props.disabled,
        'va-collapse--solid': props.solid,
        'va-collapse--active': props.solid && computedModelValue.value,
        'va-collapse--popout': accordionProps.value.popout && computedModelValue.value,
        'va-collapse--inset': accordionProps.value.inset && computedModelValue.value,
      })),

      headerStyle: computed(() => ({
        paddingLeft: props.icon && 0,
        color: textColorComputed.value,
        backgroundColor: props.color ? getColor(props.color) : '',
        boxShadow: hasKeyboardFocus.value ? '0 0 0.5rem 0 rgba(0, 0, 0, 0.3)' : '',
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

  &__body {
    transition: var(--va-collapse-body-transition);
    overflow: var(--va-collapse-body-overflow);
    margin-top: var(--va-collapse-body-margin-top);
  }

  &__header {
    &__content {
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
    }

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
  }

  &--solid {
    box-shadow: var(--va-collapse-solid-box-shadow);
    border-radius: var(--va-collapse-solid-border-radius);

    .va-collapse {
      &__header {
        &__content {
          border-radius: var(--va-collapse-solid-header-content-border-radius, var(--va-block-border-radius));
          transition: var(--va-collapse-solid-header-content-transition);
          box-shadow: var(--va-collapse-solid-header-content-box-shadow, var(--va-block-box-shadow));
          background-color: var(--va-collapse-solid-header-content-background-color);
        }
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

    pointer-events: none;
  }
}
</style>
