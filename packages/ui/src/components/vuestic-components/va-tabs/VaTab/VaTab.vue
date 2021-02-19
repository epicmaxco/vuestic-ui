<template>
  <component
    class="va-tab"
    :is="tagComputed"
    :href="hrefComputed"
    :target="target"
    :to="to"
    :replace="replace"
    :exact="exact"
    :active-class="activeClass"
    :exact-active-class="exactActiveClass"
    :class="classComputed"
    :tabindex="tabIndexComputed"
  >
    <div
      class="va-tab__content"
      @focus="onFocus"
      @blur="isKeyboardFocused = false"
      @click="onTabClick()"
      @keydown.enter="onTabKeydown"
      @mousedown="hasMouseDown = true"
      @mouseup="hasMouseDown = false"
    >
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
import { inject } from 'vue'
import { Options, mixins, prop, Vue, setup } from 'vue-class-component'

import { KeyboardOnlyFocusMixin } from '../../../vuestic-mixins/KeyboardOnlyFocusMixin/KeyboardOnlyFocusMixin'
import { RouterLinkMixin } from '../../../vuestic-mixins/RouterLinkMixin/RouterLinkMixin'
import VaIcon from '../../va-icon'

import { TabsServiceKey, TabsService } from '../VaTabs.vue'

type Context = {
  tabsService: TabsService | null;
}

class TabProps {
  icon = prop<string>({ type: String, default: null })
  label = prop<string>({ type: String, default: null })
  disabled = prop<boolean>({ type: Boolean })
  name = prop<string | number>({ type: [String, Number] })
  tag = prop<string>({ type: String, default: 'div' })
}

const TabPropsMixin = Vue.with(TabProps)

@Options({
  name: 'VaTab',
  components: { VaIcon },
  emits: ['click', 'keydown-enter', 'focus'],
})
export default class VaTab extends mixins(
  KeyboardOnlyFocusMixin,
  RouterLinkMixin,
  TabPropsMixin,
) {
  isActive = false
  id: any = null

  context: Context = setup(() => {
    const tabsService: TabsService | null = inject(TabsServiceKey, null)

    return {
      tabsService,
    }
  })

  get classComputed () {
    return {
      'va-tab--active': this.isActive,
      'va-tab--disabled': this.$props.disabled,
      'va-tab--on-keyboard-focus': this.isKeyboardFocused,
    }
  }

  get tabIndexComputed () {
    return (this.$props.disabled || this.isActive) ? -1 : 0
  }

  get rightSidePosition () {
    return (this as any).$el.offsetLeft + (this as any).$el.offsetWidth
  }

  get leftSidePosition () {
    return (this as any).$el.offsetLeft
  }

  onTabClick () {
    // this.tabsHanler.eventEmitter.emit('click:tab', this)
    // eslint-disable-next-line no-unused-expressions
    this.context.tabsService?.tabClick(this)
    this.$emit('click')
  }

  onTabKeydown () {
    // this.tabsHanler.eventEmitter.emit('keydown-enter:tab', this)
    // eslint-disable-next-line no-unused-expressions
    this.context.tabsService?.tabPressEnter(this)
    this.$emit('keydown-enter')
  }

  onFocus () {
    this.KeyboardOnlyFocusMixin_onFocus()
    // this.tabsHanler.eventEmitter.emit('focus:tab', this)
    // eslint-disable-next-line no-unused-expressions
    this.context.tabsService?.tabFocus(this)
    this.$emit('focus')
  }

  beforeMount () {
    // const idx = this.tabsHanler.tabs.push(this)
    // this.id = (this as any).$props.name || idx
    // eslint-disable-next-line no-unused-expressions
    this.context.tabsService?.register(this)
  }

  beforeUnmount () {
    // eslint-disable-next-line no-unused-expressions
    this.context.tabsService?.unregister(this)
    // this.tabsHanler.tabs = this.tabsHanler.tabs.filter((t: { id: any }) => t.id === this.id)
    // // eslint-disable-next-line no-return-assign
    // this.tabsHanler.tabs.forEach((t: VaTab | any, idx: number) => t.id = t.$props.name || idx)
  }
}
</script>

<style lang="scss">
@import "src/components/vuestic-sass/resources/resources";

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
    padding: 0.4375rem 0.75rem;
    cursor: pointer;
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
