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
    class="va-tab"
    :class="classComputed"
    @click="onTabClick"
    @keydown.enter="onTabKeydown"
    @mousedown="hasMouseDown = true"
    @mouseup="hasMouseDown = false"
    :tabindex="tabIndexComputed"
    @focus="onFocus"
    @blur="isKeyboardFocused = false"
  >
    <div class="va-tab__content">
      <slot>
        <va-icon
          v-if="icon"
          class="va-tab__icon"
          :name="icon"
          size="small"
        />
        <span
          class="va-tab__label"
          v-text="label"
        />
      </slot>
    </div>
  </component>
</template>

<script lang="ts">
import { Inject, Mixins } from 'vue-property-decorator'

import VaIcon from '../va-icon/VaIcon.vue'

import { KeyboardOnlyFocusMixin } from '../../vuestic-mixins/KeyboardOnlyFocusMixin/KeyboardOnlyFocusMixin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { RouterLinkMixin } from '../../vuestic-mixins/RouterLinkMixin/RouterLinkMixin'
import { Options } from 'vue-class-component'
import VaTabs from './VaTabs.vue'
import mitt from 'mitt'

const TabPropsMixin = makeContextablePropsMixin({
  icon: { type: String, default: null },
  label: { type: String, default: null },
  disabled: { type: Boolean },
  name: { type: [String, Number] },
  tag: { type: String, default: 'div' },
})

@Options({
  name: 'VaTab',
  components: { VaIcon },
  emits: ['click', 'keydown-enter', 'focus'],
})
export default class VaTab extends Mixins(
  KeyboardOnlyFocusMixin,
  RouterLinkMixin,
  TabPropsMixin,
) {
  @Inject() tabsHanler!: VaTabs
  // @Inject() eventEmitter!: any
  isActive = false
  id: any = null

  get classComputed () {
    return {
      'va-tab--active': this.isActive,
      'va-tab--disabled': this.c_disabled,
      'va-tab--on-keyboard-focus': this.isKeyboardFocused,
    }
  }

  get tabIndexComputed () {
    return (this.c_disabled || this.isActive) ? -1 : 0
  }

  get rightSidePosition () {
    return (this as any).$el.offsetLeft + (this as any).$el.offsetWidth
  }

  get leftSidePosition () {
    return (this as any).$el.offsetLeft
  }

  onTabClick () {
    this.tabsHanler.eventEmitter.emit('click:tab', this)
    this.$emit('click')
  }

  onTabKeydown () {
    this.tabsHanler.eventEmitter.emit('keydown.enter:tab', this)
    this.$emit('keydown-enter')
  }

  onFocus () {
    (this as any).KeyboardOnlyFocusMixin_onFocus()
    this.tabsHanler.eventEmitter.emit('focus:tab', this)
    this.$emit('focus')
  }

  mounted () {
    const idx = this.tabsHanler.tabs.push(this)
    this.id = (this as any).$props.name || idx
  }

  beforeUnmaunt () {
    this.tabsHanler.tabs = this.tabsHanler.tabs.filter((t: { id: any }) => t.id === this.id)
    // eslint-disable-next-line no-return-assign
    this.tabsHanler.tabs.forEach((t: VaTab | any, idx: number) => t.id = t.$props.name || idx)
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-tab {
  align-items: center;
  display: inline-flex;
  flex: 0 1 auto;
  font-weight: $font-weight-bold;
  line-height: normal;
  height: inherit;
  max-width: 264px;
  text-align: center;
  vertical-align: middle;
  padding: 0.4375rem 0.75rem;
  cursor: pointer;
  color: inherit;

  &:not(.va-tab--active) {
    opacity: 0.7;
  }

  &__content {
    align-items: center;
    color: inherit;
    display: flex;
    flex: 1 1 auto;
    height: 100%;
    justify-content: center;
    max-width: inherit;
    text-decoration: none;
    transition: $transition-primary;
    user-select: none;
    white-space: nowrap;
  }

  &__icon {
    margin-right: 0.5rem;
  }

  &.va-tab--disabled {
    @include va-disabled();

    pointer-events: none;
  }

  &:hover {
    opacity: 1;
  }

  &.va-tab--on-keyboard-focus {
    opacity: 1;
  }
}
</style>
