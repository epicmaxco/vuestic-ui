<template>
  <div
    v-if="valueComputed"
    class="va-tag"
    :class="computedClass"
    :style="computedStyle"
    @mouseenter="updateHoverState(true)"
    @mouseleave="updateHoverState(false)"
    @focus="updateFocusState(true)"
    @blur="updateFocusState(false)"
  >
    <div class="va-tag__content">
      <va-icon
        v-if="c_icon"
        class="va-tag__icon"
        :name="icon"
        :size="iconSize"
      />
      <slot></slot>
      <va-icon
        v-if="c_closeable"
        class="va-tag__close-icon"
        @click="close()"
        name="close"
        size="20px"
      />
    </div>
  </div>
</template>

<script lang="ts">
import VaIcon from '../va-icon/VaIcon.vue'
import {
  getBoxShadowColor,
  getHoverColor,
  getFocusColor,
} from '../../../services/color-functions'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { StatefulMixin } from '../../vuestic-mixins/StatefullMixin/StatefulMixin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { Component, Mixins, Watch } from 'vue-property-decorator'

const TagPropsMixin = makeContextablePropsMixin({
  value: { type: Boolean, default: true },
  closeable: { type: Boolean, default: false },
  color: { type: String, default: '' },
  outline: { type: Boolean, default: false },
  flat: { type: Boolean, default: false },
  icon: { type: String, default: '' },
  iconSize: { type: [Number, String], default: '18px' },
  disabled: { type: Boolean, default: false },
  square: { type: Boolean, default: false },
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
  hoverState = false
  focusState = false

  @Watch('hoverState')
  onHoverChange (value: boolean) {
    this.updateFocusState(value)
    this.updateHoverState(value)
  }

  get computedClass () {
    return {
      'va-tag--small': this.c_size === 'small',
      'va-tag--large': this.c_size === 'large',
      'va-tag--square': this.c_square,
      'va-tag--disabled': this.c_disabled,
    }
  }

  get shadowStyle () {
    if (this.c_flat || this.c_outline) {
      return
    }
    return '0 0.125rem 0.19rem 0 ' + getBoxShadowColor(this.colorComputed)
  }

  get computedStyle () {
    const computedStyle: any = {
      color: '',
      borderColor: '',
      background: '',
      boxShadow: '',
    }

    if (this.focusState) {
      if (this.c_outline || this.c_flat) {
        computedStyle.color = this.colorComputed
        computedStyle.borderColor = this.c_outline ? this.colorComputed : ''
        computedStyle.background = getFocusColor(this.colorComputed)
      }
    } else if (this.hoverState) {
      if (this.c_outline || this.c_flat) {
        computedStyle.color = this.colorComputed
        computedStyle.borderColor = this.c_outline ? this.colorComputed : ''
        computedStyle.background = getHoverColor(this.colorComputed)
      } else {
        computedStyle.boxShadow = this.shadowStyle
      }
    } else {
      computedStyle.color = this.c_flat || this.c_outline ? this.colorComputed : '#ffffff'
      computedStyle.borderColor = this.c_outline ? this.colorComputed : ''
      computedStyle.boxShadow = this.shadowStyle
    }

    if (!this.c_outline && !this.c_flat) {
      computedStyle.background = this.colorComputed
    }

    return computedStyle
  }

  updateHoverState (isHover: boolean) {
    this.hoverState = isHover
  }

  updateFocusState (isHover: boolean) {
    this.focusState = isHover
  }

  close () {
    if (!this.c_disabled) {
      this.valueComputed = false
    }
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
  color: $white;
  cursor: default;

  &:hover {
    opacity: 0.85;
  }

  &__content {
    display: flex;
    align-items: center;
    padding: auto;
    line-height: 1.6;
  }

  &__icon {
    padding-right: 0.375rem;
  }

  &__close-icon {
    cursor: pointer;
    margin-left: 0.375rem;
  }

  &--square {
    border-radius: 0.2rem;
  }

  &--small {
    height: 1.5rem;
  }

  &--large {
    height: 2.5rem;
  }

  &--disabled {
    @include va-disabled;

    &:hover {
      opacity: 0.4;
    }
  }
}
</style>
