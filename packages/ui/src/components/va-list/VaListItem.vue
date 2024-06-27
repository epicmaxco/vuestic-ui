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

<script lang="ts" setup>
import { computed } from 'vue'

import {
  useBem,
  useComponentPresetProp,
  useRouterLink, useRouterLinkProps,
} from '../../composables'
import { pick } from '../../utils/pick'

defineOptions({
  name: 'VaListItem',
})

const props = defineProps({
  ...useRouterLinkProps,
  ...useComponentPresetProp,
  tag: { type: String, default: 'div' },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['focus', 'click'])

const tabIndexComputed = computed(() => props.disabled ? -1 : 0)

const computedClass = useBem('va-list-item', () => ({
  ...pick(props, ['disabled']),
}))

const {
  tagComputed,
  hrefComputed,
} = useRouterLink(props)
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-list-item {
  display: block;
  font-family: var(--va-font-family);

  &--disabled {
    @include va-disabled;
  }

  &:not(.va-list-item--disabled) {
    @include keyboard-focus-outline($radius: 2px, $offset: -2px);
  }

  &__inner {
    display: var(--va-list-item-display);
    align-items: var(--va-list-item-align-items);
    width: var(--va-list-item-width);
    height: var(--va-list-item-height);
  }
}
</style>
