<template>
  <component
    :is="tagComputed"
    class="va-breadcrumb-item"
    :class="classComputed"
    :active-class="$props.activeClass"
    :href="hrefComputed"
    :to="$props.to"
    :target="$props.target"
    :replace="$props.replace"
    :append="$props.append"
    :exact="$props.exact"
    :exact-active-class="$props.exactActiveClass"
  >
    <slot>{{ label }}</slot>
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useRouterLink, useRouterLinkProps } from '../../../composables/useRouterLink'

export default defineComponent({
  name: 'VaBreadcrumbsItem',
  props: {
    ...useRouterLinkProps,
    disabled: { type: Boolean, default: false },
    label: { type: String, default: '' },
  },
  setup: (props) => {
    const { tagComputed, hrefComputed, isLinkTag } = useRouterLink(props)
    const classComputed = computed(() => ({
      'va-breadcrumb-item--link': isLinkTag.value,
    }))
    return { tagComputed, hrefComputed, classComputed }
  },
})
</script>

<style lang="scss">
@import "variables";

.va-breadcrumb-item {
  display: var(--va-breadcrumb-item-display);
  color: var(--va-breadcrumb-item-color);

  &--link {
    color: inherit;

    &:hover {
      opacity: var(--va-breadcrumb-item-hover-opacity);
    }

    &:focus {
      text-decoration: var(--va-breadcrumb-item-focus-text-decoration);
    }
  }
}
</style>
