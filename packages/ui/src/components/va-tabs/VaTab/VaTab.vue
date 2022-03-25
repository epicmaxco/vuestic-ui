<template>
  <component
    class="va-tab"
    ref="tabElement"
    :is="tagComputed"
    :href="hrefComputed"
    :target="target"
    :to="to"
    :replace="replace"
    :exact="exact"
    :active-class="activeClass"
    :exact-active-class="exactActiveClass"
    :class="classComputed"
    :style="computedStyle"
    @mouseenter="updateHoverState(true)"
    @mouseleave="updateHoverState(false)"
  >
    <div
      class="va-tab__content"
      v-on="keyboardFocusListeners"
      :tabindex="tabIndexComputed"
      @focus="onFocus()"
      @click="onTabClick()"
      @keydown.enter="onTabKeydown()"
    >
      <slot>
        <va-icon
          v-if="icon"
          class="va-tab__icon"
          :name="icon"
          size="small"
        />
        <span
          class="va-tab__label"
          v-text="label"
        />
      </slot>
    </div>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, ref, SetupContext } from 'vue'
import VaIcon from '../../va-icon'
import { useRouterLink, useRouterLinkProps } from '../../../composables/useRouterLink'
import { TabComponent, useTab } from '../hooks/useTab'
import useKeyboardOnlyFocus from '../../../composables/useKeyboardOnlyFocus'
import { useColor } from '../../../composables/useColor'

export default defineComponent({
  name: 'VaTab',
  components: { VaIcon },
  emits: ['click', 'keydown-enter', 'focus'],

  props: {
    ...useRouterLinkProps,
    color: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
    },
    name: {
      type: [String, Number],
    },
    tag: {
      type: String,
      default: 'div',
    },
  },

  setup: (props, context: SetupContext) => {
    const tabElement = ref<HTMLElement | null>(null)

    const id = ref<string | number | null>(null)
    const hoverState = ref(false)
    const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus()
    const { tagComputed, hrefComputed, isActiveRouterLink } = useRouterLink(props)
    const { colorComputed } = useColor(props)
    const classComputed = computed(() => ({ 'va-tab--disabled': props.disabled }))

    const tabParams = {
      tabElement,
      id,
      name: props.name,
      disabled: props.disabled,
      hasKeyboardFocus,
      isActiveRouterLink,
    }

    const {
      tabIndexComputed,
      isActive,
      onFocus,
      onTabClick,
      onTabKeydown,
      rightSidePosition,
      leftSidePosition,
    }: TabComponent = useTab(tabParams, context)

    const computedStyle = computed(() => ({
      color: hasKeyboardFocus.value || hoverState.value || isActive.value ? colorComputed.value : 'inherit',
    }))

    const updateHoverState = (isHover: boolean) => {
      hoverState.value = isHover
    }

    return {
      tabElement,
      isActive,
      hoverState,
      hasKeyboardFocus,
      keyboardFocusListeners,
      tagComputed,
      hrefComputed,
      isActiveRouterLink,
      colorComputed,
      classComputed,
      computedStyle,
      tabIndexComputed,
      rightSidePosition,
      leftSidePosition,
      updateHoverState,
      onFocus,
      onTabClick,
      onTabKeydown,
    }
  },
})
</script>

<style lang="scss">
@import "../../../styles/resources";
@import 'variables';

.va-tab {
  align-items: var(--va-tab-align-items);
  display: var(--va-tab-display);
  flex: var(--va-tab-flex);
  font-weight: var(--va-tab-font-weight);
  line-height: var(--va-tab-line-height);
  height: var(--va-tab-height);
  max-width: var(--va-tab-max-width);
  text-align: var(--va-tab-text-align);
  vertical-align: var(--va-tab-vertical-align);
  color: var(--va-tab-color);

  &__content {
    align-items: var(--va-tab-content-align-items);
    color: var(--va-tab-content-color);
    display: var(--va-tab-content-display);
    flex: var(--va-tab-content-flex);
    height: var(--va-tab-content-height);
    justify-content: var(--va-tab-content-justify-content);
    max-width: var(--va-tab-content-max-width);
    text-decoration: var(--va-tab-content-text-decoration);
    transition: var(--va-tab-content-transition);
    user-select: var(--va-tab-content-user-select);
    white-space: var(--va-tab-content-white-space);
    padding: var(--va-tab-content-padding);
    cursor: var(--va-tab-content-cursor);
  }

  &__icon {
    margin-right: var(--va-tab-icon-margin-right);
  }

  &.va-tab--disabled {
    @include va-disabled();

    pointer-events: none;
  }
}
</style>
