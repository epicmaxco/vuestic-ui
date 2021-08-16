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
    :style="computedStyle"
    v-on="SetupContext.keyboardFocusListeners"
    :tabindex="indexComputed"
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

<script lang="ts">
import { Options, prop, mixins, setup, Vue } from 'vue-class-component'

import { RouterLinkMixin } from '../../vuestic-mixins/RouterLinkMixin/RouterLinkMixin'
import useKeyboardOnlyFocus from '../../../composables/useKeyboardOnlyFocus'

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
  ListItemPropsMixin,
) {
  SetupContext = setup(() => {
    const { keyboardFocusListeners, hasKeyboardFocus } = useKeyboardOnlyFocus()

    return {
      keyboardFocusListeners,
      hasKeyboardFocus,
    }
  })

  get indexComputed () {
    return this.disabled ? -1 : 0
  }

  get computedClass () {
    return {
      'va-list-item--disabled': this.disabled,
    }
  }

  get computedStyle () {
    return {
      outline: this.SetupContext.hasKeyboardFocus ? '2px solid rgba(0, 0, 0, 0.3)' : 'none', // just to have at least some highlighting of the focused items
    }
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";
@import 'variables';

.va-list-item {
  &__inner {
    display: var(--va-list-item-display);
    align-items: var(--va-list-item-align-items);
    padding: var(--va-list-item-padding);
    width: var(--va-list-item-width);
    height: var(--va-list-item-height);
  }
}
</style>
