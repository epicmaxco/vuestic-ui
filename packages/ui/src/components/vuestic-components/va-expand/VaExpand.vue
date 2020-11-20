<template>
  <div class="va-expand" :class="computedClasses">
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
        <div class="va-expand__header__content" :style="contentStyle">
          <va-icon
            v-if="icon"
            class="va-expand__header__icon"
            :name="icon"
            :color="textColor"
          />
          <div class="va-expand__header__text">
            {{ header }}
          </div>
          <va-icon
            class="va-expand__header__icon"
            :name="valueProxy ? 'expand_less' : 'expand_more'"
            :color="textColor"
          />
        </div>
      </slot>
    </div>
    <div class="va-expand__body" :style="stylesComputed" ref="body">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Mixins, Prop, Ref } from 'vue-property-decorator'

import VaIcon from '../va-icon'

import { ColorThemeMixin } from '../../vuestic-mixins/ColorMixin'
import { getHoverColor } from '../../../services/color-functions'
import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'
import { KeyboardOnlyFocusMixin } from '../../vuestic-mixins/KeyboardOnlyFocusMixin/KeyboardOnlyFocusMixin'
import { ExpandGroupService } from '../va-expand-group/VaExpandGroup.vue'

const TEXT_NODE_TYPE = 3

@Component({
  components: { VaIcon },
})
export default class VaExpand extends Mixins(
  KeyboardOnlyFocusMixin,
  StatefulMixin,
  ColorThemeMixin,
) {
  popout = undefined
  inset = undefined
  height = this.getHeight()
  transitionDuration = this.getTransitionDuration();
  mutationObserver: any = null
  valueExpand = {
    value: undefined,
  }

  @Prop({ type: Number, default: 0 }) index!: number
  @Prop({ type: Boolean, default: false }) value!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: String, default: '' }) header!: string
  @Prop({ type: String, default: '' }) icon!: string
  @Prop({ type: Boolean, default: false }) solid!: boolean
  @Prop({ type: String, default: '' }) color!: string
  @Prop({ type: String, default: '' }) textColor!: string
  @Prop({ type: Boolean, default: false }) colorAll!: boolean

  @Inject({
    from: ExpandGroupService,
    default: () => ({
      getProps: () => undefined,
      getState: () => undefined,
      onChildChange: () => undefined,
    }),
  }) readonly accordion!: any

  @Ref() readonly body!: HTMLElement

  get valueProxy () {
    if (!this.accordion.getState()) {
      return this.valueComputed
    }

    return this.valueExpand.value
  }

  set valueProxy (value) {
    this.valueComputed = value

    if (this.accordion.getState()) {
      // @ts-ignore
      this.valueExpand.value = value
      this.setExpandParams()
    }
  }

  get computedClasses () {
    const accordionProps = this.accordion.getProps()

    if (accordionProps) {
      this.popout = accordionProps.popout
      this.inset = accordionProps.inset
    }
    return {
      'va-expand--disabled': this.disabled,
      'va-expand--solid': this.solid,
      'va-expand--active': this.solid && this.valueProxy,
      'va-expand--popout': this.popout && this.valueProxy,
      'va-expand--inset': this.inset && this.valueProxy,
    }
  }

  get contentStyle () {
    return {
      paddingLeft: this.icon && 0,
      color: this.textColor ? (this as any).getColor(this.textColor) : '',
      backgroundColor: this.color ? this.colorComputed : '',
      boxShadow: this.isKeyboardFocused ? '0 0 0.5rem 0 rgba(0, 0, 0, 0.3)' : '',
    }
  }

  get stylesComputed () {
    if (this.valueProxy && this.$slots.default?.[0]) {
      return {
        height: this.height + 'px',
        transitionDuration: this.transitionDuration + 's',
        background:
          this.color && this.colorAll
            ? getHoverColor(this.colorComputed)
            : '',
      }
    }
    return {
      height: 0,
      transitionDuration: this.transitionDuration + 's',
    }
  }

  get expandIndexComputed () {
    return this.disabled ? -1 : 0
  }

  onFocus () {
    this.KeyboardOnlyFocusMixin_onFocus()
    this.$emit('focus')
  }

  changeValue () {
    this.valueProxy = !this.valueProxy

    this.accordion.onChildChange(this.index, this.valueProxy)
  }

  getHeight () {
    const nodes = [...(this.body?.childNodes || [])] as HTMLElement[]
    return nodes.reduce((result: number, node: HTMLElement) => {
      result += node.nodeType === TEXT_NODE_TYPE ? this.getTextNodeHeight(node) : node.clientHeight
      return result
    }, 0)
  }

  getTransitionDuration () {
    const duration = this.height / 1000 * 0.2
    return duration > 0.2 ? duration : 0.2
  }

  getTextNodeHeight (textNode: Node) {
    const range = document.createRange()
    range.selectNodeContents(textNode)
    const rect = range.getBoundingClientRect()
    return rect.bottom - rect.top
  }

  setExpandParams () {
    this.height = this.getHeight()
    this.transitionDuration = this.getTransitionDuration()
  }

  updateValue () {
    const state = this.accordion.getState()
    if (state) {
      this.valueProxy = state[this.index]
    }
  }

  updated () {
    this.updateValue()
  }

  mounted () {
    this.updateValue()

    this.mutationObserver = new MutationObserver(() => {
      this.setExpandParams()
    })
    this.mutationObserver.observe(this.body, { attributes: true, childList: true, subtree: true })
  }

  beforeDestroy () {
    if (this.mutationObserver) { this.mutationObserver.disconnect() }
  }
}
</script>

<style lang="scss" scoped>
@import "../../vuestic-sass/resources/resources";

.va-expand {
  transition: all 0.3s linear;

  &__body {
    transition: height linear 0.3s;
    overflow: hidden;
    margin-top: 0.1rem;
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
  }

  &--popout {
    margin: -0.5rem;
    padding-top: 1rem;
  }

  &--inset {
    margin: 0.5rem;
  }

  &--disabled {
    @include va-disabled();

    pointer-events: none;
  }
}
</style>
