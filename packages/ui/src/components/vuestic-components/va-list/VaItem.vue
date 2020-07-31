<template>
  <component
    :is="tagComputed"
    :href="href"
    :target="target"
    :to="to"
    :replace="replace"
    :exact="exact"
    :active-class="activeClass"
    :exact-active-class="exactActiveClass"
    class="va-item align--center no-wrap"
    :class="computedClass"
    :tabindex="indexComputed"
    @focus="onFocus"
    @blur="isKeyboardFocused = false"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { Component, Mixins } from 'vue-property-decorator'
import { RouterLinkMixin } from './../../vuestic-mixins/RouterLinkMixin'
import { KeyboardOnlyFocusMixin } from './../../vuestic-mixins/KeyboardOnlyFocusMixin/KeyboardOnlyFocusMixin'
const ItemPropsMixin = makeContextablePropsMixin({
  tag: { type: String, default: 'div' },
  clickable: { type: Boolean, default: false },
  disabled: { type: Boolean, defaulr: false },
})
@Component({
  name: 'VaItem',
})
export default class VaItem extends Mixins(
  RouterLinkMixin,
  KeyboardOnlyFocusMixin,
  ItemPropsMixin,
) {
  get indexComputed () {
    return this.c_disabled ? -1 : 0
  }

  get computedClass () {
    return {
      'va-item--clickable': this.c_clickable || this.hasRouterLinkParams,
      'va-item--disabled': this.c_disabled,
      'va-item--focus': this.isKeyboardFocused,
    }
  }

  onFocus () {
    (this as any).KeyboardOnlyFocusMixin_onFocus()
    this.$emit('focus')
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-item {
  display: flex;
  padding: $list-item-padding;

  &--clickable {
    &:hover {
      background-color: $light-gray3;
      cursor: pointer;
    }
  }

  &--focus {
    box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.1);
  }

  &--disabled {
    @include va-disabled();
  }
}
</style>
