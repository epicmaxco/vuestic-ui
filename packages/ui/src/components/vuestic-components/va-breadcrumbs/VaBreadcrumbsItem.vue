<template>
  <span class="va-breadcrumb-item">
    <router-link
      v-if="!isDisabled"
      class="va-breadcrumb-item__label va-breadcrumb-item__label--link"
      :to="to"
      :replace="replace"
      :append="append"
      :exact="exact"
      tag="a"
    >
      <slot>{{ label }}</slot>
    </router-link>
    <span
      v-else
      class="va-breadcrumb-item__label"
    >
      <slot>{{ label }}</slot>
    </span>
  </span>
</template>

<script lang="ts">
// @ts-ignore
import { RouterLinkMixin } from '../../vuestic-mixins/RouterLinkMixin'
import { ContextPluginMixin, getContextPropValue } from '../../context-test/context-provide/ContextPlugin'
import { Component, Prop, Mixins } from 'vue-property-decorator'

@Component({})
export default class VaBreadcrumbsItem extends Mixins(RouterLinkMixin, ContextPluginMixin) {
    @Prop({
      type: Boolean,
      default () {
        return getContextPropValue(this as any, 'disabled', false as any)
      },
    }) readonly disabled!: boolean

    @Prop({
      type: [String, Number],
      default () {
        return getContextPropValue(this as any, 'label', '' as any)
      },
    }) readonly label!: string

    get isDisabled () {
      return this.disabled || !(this as any).hasRouterLinkParams
    }
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
