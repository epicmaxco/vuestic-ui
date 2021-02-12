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
  >
    <div
      class="va-list-item__inner"
      @mousedown="hasMouseDown = true"
      @mouseup="hasMouseDown = false"
      @focus="onFocus"
      @blur="isKeyboardFocused = false"
      @click="$emit('click')"
    >
      <slot />
    </div>
  </component>
</template>

<script lang="ts">
import { Options, prop, mixins, Vue } from 'vue-class-component'

import { RouterLinkMixin } from '../../vuestic-mixins/RouterLinkMixin/RouterLinkMixin'
import { KeyboardOnlyFocusMixin } from '../../vuestic-mixins/KeyboardOnlyFocusMixin/KeyboardOnlyFocusMixin'

class ListItemProps {
  tag = prop<string>({ type: String, default: 'div' })
  disabled = prop<boolean>({ type: Boolean, default: false })
}

const ListItemPropsMixin = Vue.with(ListItemProps)

@Options({
  name: 'VaListItem',
  emits: ['focus', 'click'],
})
export default class VaListItem extends mixins(
  RouterLinkMixin,
  KeyboardOnlyFocusMixin,
  ListItemPropsMixin,
) {
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
  &__inner {
    display: flex;
    align-items: center;
    padding: $grid-gutter-default;
    width: 100%;
    height: 100%;
  }
}
</style>
