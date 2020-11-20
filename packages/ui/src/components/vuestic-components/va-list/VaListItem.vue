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
import { Component, Mixins, Prop } from 'vue-property-decorator'

import { RouterLinkMixin } from '../../vuestic-mixins/RouterLinkMixin/RouterLinkMixin'
import { KeyboardOnlyFocusMixin } from '../../vuestic-mixins/KeyboardOnlyFocusMixin/KeyboardOnlyFocusMixin'

@Component({
  name: 'VaListItem',
})
export default class VaListItem extends Mixins(
  RouterLinkMixin,
  KeyboardOnlyFocusMixin,
) {
  @Prop({ type: String, default: 'div' }) tag!: string
  @Prop({ type: Boolean, default: false }) disabled!: boolean

  get indexComputed () {
    return this.disabled ? -1 : 0
  }

  get computedClass () {
    return {
      'va-list-item--disabled': this.disabled,
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
