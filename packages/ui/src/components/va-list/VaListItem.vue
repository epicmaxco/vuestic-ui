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
    :tabindex="tabIndexComputed"
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
import { defineComponent, computed } from 'vue'

import { useComponentPresetProp, useRouterLink, useRouterLinkProps } from '../../composables'

export default defineComponent({
  name: 'VaListItem',
  emits: ['focus', 'click'],
  props: {
    ...useRouterLinkProps,
    ...useComponentPresetProp,
    tag: { type: String, default: 'div' },
    disabled: { type: Boolean, default: false },
  },

  setup (props) {
    const tabIndexComputed = computed(() => props.disabled ? -1 : 0)

    const computedClass = computed(() => ({
      'va-list-item--disabled': props.disabled,
    }))

    return {
      ...useRouterLink(props),
      tabIndexComputed,
      computedClass,
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-list-item {
  font-family: var(--va-font-family);

  &--disabled {
    @include va-disabled;
  }

  &:focus:not(.va-list-item--disabled) {
    @include focus-outline;
  }

  &__inner {
    display: var(--va-list-item-display);
    align-items: var(--va-list-item-align-items);
    width: var(--va-list-item-width);
    height: var(--va-list-item-height);
  }
}
</style>
