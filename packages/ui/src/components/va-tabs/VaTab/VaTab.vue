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
      v-on="keyboardFocusListeners"
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
import { defineComponent, inject, ref, computed } from 'vue'
import VaIcon from '../../va-icon'
import { TabsServiceKey } from '../types'
import { TabsService } from '../VaTabs.vue'
import { useColor } from '../../../composables/useColor'
import { useRouterLink, useRouterLinkProps } from '../../../composables/useRouterLink'
import useKeyboardOnlyFocus from '../../../composables/useKeyboardOnlyFocus'

export default defineComponent({
  name: 'VaTab',
  components: { VaIcon },
  emits: ['click', 'keydown-enter', 'focus'],

  props: {
    ...useRouterLinkProps,
    color: {
      type: String,
      default: undefined,
    },
    icon: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
    },
    name: {
      type: [String, Number],
    },
    tag: {
      type: String,
      default: 'div',
    },
  },

  setup: (props) => {
    const id = ref<string | number | null>(null)
    const isActive = ref(false)
    const rightSidePosition = ref(0)
    const leftSidePosition = ref(0)
    const hoverState = ref(false)
    const tabsService = inject(TabsServiceKey) as TabsService
    const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus()
    const { colorComputed } = useColor(props)

    const classComputed = computed(() => ({ 'va-tab--disabled': props.disabled }))

    const computedStyle = computed(() => ({
      color: hasKeyboardFocus || hoverState || isActive ? colorComputed : 'inherit',
    }))

    const tabIndexComputed = computed(() => (props.disabled || tabsService.disabled) ? -1 : 0)
    const { tagComputed, hrefComputed } = useRouterLink(props)

    return {
      id,
      isActive,
      rightSidePosition,
      leftSidePosition,
      hoverState,
      classComputed,
      computedStyle,
      tabIndexComputed,
      tabsService,
      hasKeyboardFocus,
      keyboardFocusListeners,
      tagComputed,
      hrefComputed,
    }
  },

  beforeMount () {
    this.tabsService.register(this)
  },

  beforeUnmount () {
    this.tabsService.unregister(this)
  },

  methods: {
    onTabClick () {
      this.tabsService.tabClick(this)
      this.$emit('click')
    },

    onTabKeydown () {
      this.tabsService.tabPressEnter(this)
      this.$emit('keydown-enter')
    },

    onFocus () {
      if (this.hasKeyboardFocus) {
        this.tabsService.tabFocus(this)
      }
      this.$emit('focus')
    },

    updateHoverState (isHover: boolean) {
      this.hoverState = isHover
    },

    updateSidePositions () {
      this.rightSidePosition = this.$el.offsetLeft + this.$el.offsetWidth
      this.leftSidePosition = this.$el.offsetLeft
    },
  },
})
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
