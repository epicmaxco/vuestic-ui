<template>
  <div
    class="va-expand"
    :class="computedClasses"
  >
    <div
      class="va-expand__header"
      @click="changeValue()"
      :tabindex="expandIndexComputed"
      @mousedown="hasMouseDown = true"
      @mouseup="hasMouseDown = false"
      @focus="onFocus"
      @blur="isKeyboardFocused = false"
    >
      <slot name="header">
        <div
          class="va-expand__header__content"
          :style="contentStyle"
        >
          <va-icon
            v-if="c_icon"
            class="va-expand__header__icon"
            :name="c_icon"
            :color="c_textColor"
          />
          <div class="va-expand__header__text">
            {{c_header}}
          </div>
          <va-icon
            v-if="childValue"
            class="va-expand__header__icon"
            name="expand_less"
            :color="c_textColor"
          />
          <va-icon
            v-else
            class="va-expand__header__icon"
            name="expand_more"
            :color="c_textColor"
          />
        </div>
      </slot>
    </div>
    <div
      class="va-expand__body"
      :style="stylesComputed"
      ref="body"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Inject } from 'vue-property-decorator'

import VaIcon from '../va-icon/VaIcon.vue'

import {
  makeContextablePropsMixin,
} from '../../context-test/context-provide/ContextPlugin'
import { ColorThemeMixin, getColor } from '../../../services/ColorThemePlugin'
import {
  getHoverColor,
} from '../../../services/color-functions'
import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'
import { KeyboardOnlyFocusMixin } from '../../vuestic-mixins/KeyboardOnlyFocusMixin/KeyboardOnlyFocusMixin'

const ExpandPropsMixin = makeContextablePropsMixin({
  value: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  header: { type: String, default: '' },
  icon: { type: String, default: '' },
  solid: { type: Boolean, default: false },
  color: { type: String, default: '' },
  textColor: { type: String, default: '' },
  colorAll: { type: Boolean, default: false },
})

@Component({
  components: { VaIcon },
})
export default class VaExpand extends Mixins(
  KeyboardOnlyFocusMixin,
  StatefulMixin,
  ColorThemeMixin,
  ExpandPropsMixin,
) {
  popout = undefined
  inset = undefined
  height = this.getHeight()
  mutationObserver: any = null
  valueExpand = {
    value: undefined,
  }

  @Inject({
    default: () => ({
      onChildChange: () => undefined,
    }),
  }) readonly accordion!: any

  get childValue () {
    if (this.$parent?.$options?.name === 'VaExpandGroup') {
      return this.valueExpand.value
    }
    return this.valueComputed
  }

  set childValue (value) {
    if (this.$parent?.$options?.name === 'VaExpandGroup') {
      this.valueExpand.value = value
    }
    this.valueComputed = value
  }

  get computedClasses () {
    if (this.$parent.$props) {
      this.popout = this.$parent.$props.popout
      this.inset = this.$parent.$props.inset
    }
    return {
      'va-expand--disabled': this.c_disabled,
      'va-expand--solid': this.c_solid,
      'va-expand--solid--active': this.c_solid && this.childValue,
      'va-expand--popout': this.popout && this.childValue,
      'va-expand--inset': this.inset && this.childValue,
    }
  }

  get contentStyle () {
    return {
      paddingLeft: this.c_icon && 0,
      color: this.c_textColor ? getColor(this, this.c_textColor) : '',
      backgroundColor: this.c_color ? this.colorComputed : '',
      boxShadow: this.isKeyboardFocused ? '0 0 0.5rem 0 rgba(0, 0, 0, 0.3)' : '',
    }
  }

  get stylesComputed () {
    if (this.childValue && this.$slots.default?.[0]) {
      return {
        height: this.height,
        paddingTop: 1 + 'rem',
        paddingBottom: 1 + 'rem',
        background: this.c_color && this.c_colorAll
          ? getHoverColor(this.colorComputed)
          : '',
      }
    }
    return {
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
    }
  }

  get expandIndexComputed () {
    return (this.c_disabled) ? -1 : 0
  }

  onFocus () {
    this.KeyboardOnlyFocusMixin_onFocus()
    this.$emit('focus')
  }

  changeValue () {
    this.childValue = !this.childValue
    this.accordion.onChildChange(this, this.childValue)
  }

  getHeight () {
    const node = this.$slots.default?.[0].elm as HTMLElement
    return node ? `calc(${node.clientHeight}px + 2rem)` : '100%'
  }

  mounted () {
    this.mutationObserver = new MutationObserver(() => {
      this.height = this.getHeight()
    })
    this.mutationObserver.observe(this.$refs.body, { attributes: true, childList: true, subtree: true })
  }

  beforeDestroy () {
    if (this.mutationObserver) { this.mutationObserver.disconnect() }
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-expand {
  transition: all 0.3s linear;
  margin: 0.5rem;

  & + & {
    margin-top: 1.5rem;
  }

  &__body {
    height: 0;
    transition: ease-in 0.3s;
    overflow: hidden;
    margin-top: 0.1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  &__header {
    &__content {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      background-color: $light-gray3;
      box-shadow: 0 2px 3px 0 rgba(98, 106, 119, 0.25);
      border-radius: 0.375rem;
      align-items: center;
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      padding-left: 1rem;
    }

    &__text {
      width: 100%;
    }

    &__icon {
      @include flex-center();

      min-width: 1.5rem;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      color: $gray;
    }
  }

  &--solid {
    box-shadow: 0 2px 3px 0 rgba(98, 106, 119, 0.25);
    border-radius: 0.375rem;

    .va-expand {
      &__header {
        &__content {
          border-radius: 0.375rem;
          transition: ease-in 0.3s;
          box-shadow: none;
          background-color: $light-gray3;
        }
      }

      &__body {
        border-radius: 0 0 0.375rem 0.375rem;
        margin-top: 0;
      }
    }

    &--active {
      .va-expand {
        &__header {
          &__content {
            border-radius: 0.375rem 0.375rem 0 0;
            transition: ease-in 0.3s;
          }
        }
      }
    }
  }

  &--popout {
    margin: 0;
  }

  &--inset {
    margin: 1rem;
  }

  &--disabled {
    @include va-disabled();

    pointer-events: none;
  }
}
</style>
