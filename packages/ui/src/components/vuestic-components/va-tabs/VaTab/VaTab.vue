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
  >
    <div
      class="va-tab__content"
      v-on="context.keyboardFocusListeners"
      @focus="onFocus"
      @click="onTabClick()"
      @keydown.enter="onTabKeydown"
      :tabindex="tabIndexComputed"
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

import useKeyboardOnlyFocus from '../../../../composables/useKeyboardOnlyFocus'
import { RouterLinkMixin } from '../../../vuestic-mixins/RouterLinkMixin/RouterLinkMixin'
import VaIcon from '../../va-icon'

import { TabsServiceKey, TabsService } from '../VaTabs.vue'

type Context = {
  tabsService: TabsService | null;
  hasKeyboardFocus: boolean;
  keyboardFocusListeners: {}
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
  RouterLinkMixin,
  TabPropsMixin,
) {
  isActive = false
  id: any = null

  context: Context = setup(() => {
    const tabsService: TabsService | null = inject(TabsServiceKey, null)

    const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus()

    return {
      tabsService,
      hasKeyboardFocus,
      keyboardFocusListeners,
    }
  })

  get classComputed () {
    return {
      'va-tab--active': this.isActive,
      'va-tab--disabled': this.$props.disabled,
      'va-tab--on-keyboard-focus': this.context.hasKeyboardFocus,
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
@import "../../../vuestic-sass/resources/resources";
@import 'variables';

.va-tab {
  align-items: var(--va-tab-align-items);
  display: var(--va-tab-display);
  flex: var(--va-tab-flex);
  font-weight: var(--va-tab-font-weight);
  line-height: var(--va-tab-line-height);
  height: var(--va-tab-height);
  max-width: var(--va-tab-max-width);
  text-align: var(--va-tab-text-align);
  vertical-align: var(--va-tab-vertical-align);
  color: var(--va-tab-color);

  &:not(.va-tab--active) {
    opacity: 0.7;
  }

  &__content {
    align-items: var(--va-tab-content-align-items);
    color: var(--va-tab-content-color);
    display: var(--va-tab-content-display);
    flex: var(--va-tab-content-flex);
    height: var(--va-tab-content-height);
    justify-content: var(--va-tab-content-justify-content);
    max-width: var(--va-tab-content-max-width);
    text-decoration: var(--va-tab-content-text-decoration);
    transition: var(--va-tab-content-transition);
    user-select: var(--va-tab-content-user-select);
    white-space: var(--va-tab-content-white-space);
    padding: var(--va-tab-content-padding);
    cursor: var(--va-tab-content-cursor);
  }

  &__icon {
    margin-right: var(--va-tab-icon-margin-right);
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
