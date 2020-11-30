<template>
  <component
    :is="tagComputed"
    :href="hrefComputed"
    :target="target"
    :to="to"
    :replace="replace"
    :exact="exact"
    :active-class="activeClass"
    :exact-active-class="exactActiveClass"
    class="va-list-item"
    :class="computedClass"
    :tabindex="indexComputed"
    @mousedown="hasMouseDown = true"
    @mouseup="hasMouseDown = false"
    @focus="onFocus"
    @blur="isKeyboardFocused = false"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { Mixins } from 'vue-property-decorator'

import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { RouterLinkMixin } from './../../vuestic-mixins/RouterLinkMixin/RouterLinkMixin'
import { KeyboardOnlyFocusMixin } from './../../vuestic-mixins/KeyboardOnlyFocusMixin/KeyboardOnlyFocusMixin'
import { Options } from 'vue-class-component'

const ItemPropsMixin = makeContextablePropsMixin({
  tag: { type: String, default: 'div' },
  disabled: { type: Boolean, default: false },
})
@Options({
  name: 'VaListItem',
  emits: ['focus', 'click'],
})
export default class VaListItem extends Mixins(
  RouterLinkMixin,
  KeyboardOnlyFocusMixin,
  ItemPropsMixin,
) {
  get indexComputed () {
    return this.c_disabled ? -1 : 0
  }

  get computedClass () {
    return {
      'va-list-item--disabled': this.c_disabled,
      'va-list-item--focus': this.isKeyboardFocused,
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

.va-list-item {
  display: flex;
  align-items: center;
  padding: $grid-gutter-default;
}
</style>
