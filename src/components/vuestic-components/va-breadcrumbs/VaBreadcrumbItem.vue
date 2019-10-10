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
export default {
  name: 'va-breadcrumb-item',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: [ String, Number ],
      default: '',
    },
    to: {
      type: String,
    },
    exact: {
      type: Boolean,
      default: true,
    },
    replace: {
      type: Boolean,
      default: false,
    },
    append: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isDisabled () {
      return this.disabled || !this.to
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
        text-decoration: underline;
      }

      &:focus {
        text-decoration: underline;
      }
    }
  }
}

</style>
