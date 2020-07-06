<template>
  <div
    v-if="valueComputed"
    class="va-tag"
    :class="computedClass"
    :style="computedStyle"
  >
    <div class="va-tag__content">
      <slot></slot>
      <va-icon
        v-if="c_closeable"
        class="va-tag__close-icon"
        @click="close()"
        name="close"
        size="18px"
      />
    </div>
  </div>
</template>

<script lang="ts">
import VaIcon from '../va-icon/VaIcon.vue'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { StatefulMixin } from '../../vuestic-mixins/StatefullMixin/StatefulMixin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { Component, Mixins } from 'vue-property-decorator'

const TagPropsMixin = makeContextablePropsMixin({
  value: { type: Boolean, default: true },
  closeable: { type: Boolean, default: false },
  color: { type: String, default: '' },
  outline: { type: Boolean, default: false },
  flat: { type: Boolean, default: false },
  size: {
    type: String,
    default: 'medium',
    validator: (value: string) => {
      return ['medium', 'small', 'large'].includes(value)
    },
  },
})

@Component({
  name: 'VaTag',
  components: { VaIcon },
})
export default class VaTag extends Mixins(
  StatefulMixin,
  ColorThemeMixin,
  TagPropsMixin,
) {
  get computedClass () {
    return {
      'va-tag--small': this.c_size === 'small',
      'va-tag--large': this.c_size === 'large',
    }
  }

  get computedStyle () {
    return {
      backgroundColor: this.c_flat
        ? ''
        : !this.c_outline
          ? this.colorComputed
          : '',
      borderColor: !this.c_flat
        ? this.colorComputed
        : '',
      color: this.c_outline || this.c_flat
        ? this.colorComputed
        : '#fff',
    }
  }

  close () {
    this.valueComputed = false
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-tag {
  display: inline-flex;
  border: 0.125rem solid transparent;
  border-radius: 2rem;
  width: auto;
  height: auto;
  min-width: initial;
  min-height: initial;
  margin: 0;
  padding: 0 0.5rem;

  &__content {
    display: flex;
    align-items: center;
    padding: auto;
    line-height: 1.6;
  }

  &__icon {
    cursor: pointer;
  }

  &--small {
    height: 1.5rem;
  }

  &--large {
    height: 2.5rem;
  }
}
</style>
