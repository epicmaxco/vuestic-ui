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
    :style="computedStyle"
    @mouseenter="updateHoverState(true)"
    @mouseleave="updateHoverState(false)"
  >
    <div
      class="va-tab__content"
      v-on="context.keyboardFocusListeners"
      :tabindex="tabIndexComputed"
      @focus="onFocus()"
      @click="onTabClick()"
      @keydown.enter="onTabKeydown()"
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

import ColorMixin from '../../../services/color-config/ColorMixin'
import useKeyboardOnlyFocus from '../../../composables/useKeyboardOnlyFocus'
import { RouterLinkMixin } from '../../../mixins/RouterLinkMixin/RouterLinkMixin'
import VaIcon from '../../va-icon'

import { TabsServiceKey, TabsService } from '../VaTabs.vue'

type Context = {
  tabsService: TabsService;
  hasKeyboardFocus: boolean;
  keyboardFocusListeners: Record<string, () => void>;
}

class TabProps {
  color = prop<string>({ type: String, default: undefined })
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
  ColorMixin,
) {
  id: string | number | null = null
  isActive = false
  rightSidePosition = 0
  leftSidePosition = 0
  hoverState = false

  context: Context = setup(() => {
    const tabsService = inject(TabsServiceKey) as TabsService

    const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus()

    return {
      tabsService,
      hasKeyboardFocus,
      keyboardFocusListeners,
    }
  })

  get classComputed () {
    return {
      'va-tab--disabled': this.$props.disabled,
    }
  }

  get computedStyle () {
    return {
      color: this.context.hasKeyboardFocus || this.hoverState || this.isActive ? this.colorComputed : 'inherit',
    }
  }

  get tabIndexComputed () {
    return (this.$props.disabled || this.context.tabsService.disabled) ? -1 : 0
  }

  onTabClick () {
    this.context.tabsService.tabClick(this)
    this.$emit('click')
  }

  onTabKeydown () {
    this.context.tabsService.tabPressEnter(this)
    this.$emit('keydown-enter')
  }

  onFocus () {
    if (this.context.hasKeyboardFocus) {
      this.context.tabsService.tabFocus(this)
    }
    this.$emit('focus')
  }

  updateHoverState (isHover: boolean) {
    this.hoverState = isHover
  }

  updateSidePositions () {
    this.rightSidePosition = this.$el.offsetLeft + this.$el.offsetWidth
    this.leftSidePosition = this.$el.offsetLeft
  }

  beforeMount () {
    this.context.tabsService.register(this)
  }

  beforeUnmount () {
    this.context.tabsService.unregister(this)
  }
}
</script>

<style lang="scss">
@import "../../../styles/resources";
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
}
</style>
