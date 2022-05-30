<template>
  <component
    :is="tagComputed"
    class="va-list-item"
    role="listitem"
    :href="hrefComputed"
    :target="target"
    :to="to"
    :replace="replace"
    :exact="exact"
    :active-class="activeClass"
    :exact-active-class="exactActiveClass"
    :class="computedClass"
    :style="computedStyle"
    :tabindex="tabIndexComputed"
    v-on="keyboardFocusListeners"
  >
    <div
      class="va-list-item__inner"
      @click="$emit('click')"
      @focus="$emit('focus')"
    >
      <slot />
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

import { useRouterLinkProps, useRouterLink } from '../../composables/useRouterLink'
import useKeyboardOnlyFocus from '../../composables/useKeyboardOnlyFocus'

export default defineComponent({
  name: 'VaListItem',
  emits: ['focus', 'click'],
  props: {
    ...useRouterLinkProps,
    tag: { type: String as PropType<string>, default: 'div' },
    disabled: { type: Boolean as PropType<boolean>, default: false },
  },
  setup (props) {
    const { keyboardFocusListeners, hasKeyboardFocus } = useKeyboardOnlyFocus()

    const tabIndexComputed = computed(() => props.disabled ? -1 : 0)

    const computedClass = computed(() => ({
      'va-list-item--disabled': props.disabled,
    }))

    const computedStyle = computed(() => ({
      outline: hasKeyboardFocus.value ? '2px solid rgba(0, 0, 0, 0.3)' : 'none', // just to have at least some highlighting of the focused items
    }))

    return {
      ...useRouterLink(props),
      keyboardFocusListeners,
      hasKeyboardFocus,
      tabIndexComputed,
      computedClass,
      computedStyle,
    }
  },
})
</script>

<style lang="scss">
@import "variables";

.va-list-item {
  font-family: var(--va-font-family);

  &__inner {
    display: var(--va-list-item-display);
    align-items: var(--va-list-item-align-items);
    padding: var(--va-list-item-padding);
    width: var(--va-list-item-width);
    height: var(--va-list-item-height);
  }
}
</style>
