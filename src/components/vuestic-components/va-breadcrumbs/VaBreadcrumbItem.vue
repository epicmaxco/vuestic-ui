<template>
  <span  class="va-breadcrumb-item">
    <router-link
      v-if="!isDisabled"
      class="va-breadcrumb-item__label va-breadcrumb-item__label--link"
      :to="to"
      :replace="replace"
      :append="append"
      :exact="exact"
      tag="a"
    >
      <slot>{{label}}</slot>
    </router-link>
    <span
      v-if="isDisabled"
      class="va-breadcrumb-item__label"
    >
      <slot>{{label}}</slot>
    </span>
  </span>
</template>

<script>
import { RouterLinkMixin } from '../../vuestic-mixins/RouterLinkMixin'

export default {
  name: 'va-breadcrumb-item',
  mixins: [ RouterLinkMixin ],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: [ String, Number ],
      default: '',
    },
  },
  computed: {
    isDisabled () {
      return this.disabled || !this.hasRouterLinkParams
    },
  },
}
</script>

<style lang="scss">
.va-breadcrumb-item {
  display: inline-flex;
  color: inherit;

  &__label {
    color: inherit;

    &--link {
      cursor: pointer;

      &:hover {
        opacity: 0.7;
      }

      &:focus {
        text-decoration: underline;
      }
    }
  }
}
</style>
