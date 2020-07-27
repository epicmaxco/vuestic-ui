<template>
  <component
    :is="c_to ? 'router-link' : 'div'"
    :to="c_to"
    class="va-item align--center no-wrap"
    :class="computedClass"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { Component, Mixins } from 'vue-property-decorator'
const ItemPropsMixin = makeContextablePropsMixin({
  to: { type: [String, Object], default: '' },
  clickable: { type: Boolean, default: false },
  disabled: { type: Boolean, defaulr: false },
})
@Component({
  name: 'VaItem',
})
export default class VaItem extends Mixins(
  ItemPropsMixin,
) {
  get computedClass () {
    return {
      'va-item--clickable': this.c_clickable || this.c_to,
      'va-item--disabled': this.c_disabled,
    }
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

  &--disabled {
    @include va-disabled();
  }
}
</style>
