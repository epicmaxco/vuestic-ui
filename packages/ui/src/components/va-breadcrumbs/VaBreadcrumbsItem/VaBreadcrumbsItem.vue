<template>
  <span class="va-breadcrumb-item">
    <router-link
      v-if="!isDisabled"
      class="va-breadcrumb-item__label va-breadcrumb-item__label--link"
      :to="$props.to"
      :replace="$props.replace"
      :append="$props.append"
      :exact="$props.exact"
      :href="hrefComputed"
      :active-class="$props.activeClass"
      :exact-active-class="$props.exactActiveClass"
      tag="a"
    >
      <slot>{{ label }}</slot>
    </router-link>
    <span v-else class="va-breadcrumb-item__label">
      <slot>{{ label }}</slot>
    </span>
  </span>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'

import { useRouterLink, useRouterLinkProps } from '../../../composables/useRouterLink'

export default defineComponent({
  name: 'VaBreadcrumbsItem',
  props: {
    ...useRouterLinkProps,
    disabled: { type: Boolean as PropType<boolean>, default: false },
    label: { type: String as PropType<string>, default: '' },
  },
  setup: (props) => {
    const { hasRouterLinkParams, hrefComputed } = useRouterLink(props)

    const isDisabled = computed(() => props.disabled || !hasRouterLinkParams.value)

    return { isDisabled, hrefComputed }
  },
})
</script>

<style lang="scss">
@import "variables";

.va-breadcrumb-item {
  display: var(--va-breadcrumb-item-display);
  color: var(--va-breadcrumb-item-color);

  &__label {
    color: inherit;

    &--link {
      cursor: pointer;

      &:hover {
        opacity: var(--va-breadcrumb-item-hover-opacity);
      }

      &:focus {
        text-decoration: var(--va-breadcrumb-item-focus-text-decoration);
      }
    }
  }
}
</style>
