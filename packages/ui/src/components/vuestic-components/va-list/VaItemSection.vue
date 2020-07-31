<template>
  <div
    class="va-item-section"
    :class="computedClass"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { Component, Mixins } from 'vue-property-decorator'
const ItemSectionPropsMixin = makeContextablePropsMixin({
  icon: { type: Boolean, default: false },
  avatar: { type: Boolean, default: false },
})
@Component({
  name: 'VaItemSection',
})
export default class VaItemSection extends Mixins(
  ItemSectionPropsMixin,
) {
  get computedClass () {
    return {
      'va-item-section--main': !this.c_icon && !this.c_avatar,
      'va-item-section--icon': this.c_icon,
      'va-item-section--avatar': this.c_avatar,
    }
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-item-section {
  display: flex;

  &--main {
    min-width: 0; // for ellipsis to work correctly
    flex-direction: column;
    flex: 1 0;
  }

  &--icon {
    min-width: 1.5rem;
    align-items: center;

    .va-icon {
      font-size: 1.25rem;
    }
  }

  &--avatar {
    min-width: 3rem;
  }
}

.va-item-section + .va-item-section {
  margin-left: 0.5rem;

  &--icon {
    &:last-child {
      margin-left: 1rem;
    }
  }
}
</style>
