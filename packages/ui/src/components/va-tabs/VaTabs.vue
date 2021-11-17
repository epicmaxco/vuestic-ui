<template>
  <div
    class="va-tabs"
    :class="computedTabsClass"
  >
    <div
      class="va-tabs__wrapper"
      ref="wrapper"
    >
      <va-button
        v-if="showPagination"
        :disabled="disablePaginationLeft"
        class="va-tabs__pagination"
        :color="color"
        flat
        size="medium"
        :icon="$props.prevIcon"
        @click="movePaginationLeft()"
      />
      <div
        class="va-tabs__container"
        :class="computedClass"
        ref="container"
      >
        <div
          class="va-tabs__tabs"
          :style="paginationControlledStyles"
          ref="tabs"
        >
          <div
            class="va-tabs__slider-wrapper"
            :style="sliderStyles"
          >
            <div class="va-tabs__slider" />
          </div>

          <va-config :components="context.tabConfig">
            <slot
              name="tabs"
              class="va-tabs__tabs-items"
            />
          </va-config>
        </div>
      </div>
      <va-button
        v-if="showPagination"
        :disabled="disablePaginationRight"
        class="va-tabs__pagination"
        :color="color"
        flat
        size="medium"
        :icon="$props.nextIcon"
        @click="movePaginationRight()"
      />
    </div>
    <div class="va-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { provide, watch, ref, reactive } from 'vue'
import { Options, Vue, prop, mixins, setup } from 'vue-class-component'

import { Ref } from '../../utils/decorators'
import ColorMixin from '../../services/color-config/ColorMixin'
import { StatefulMixin } from '../../mixins/StatefulMixin/StatefulMixin'
import VaButton from '../va-button'
import VaTab from './VaTab/VaTab.vue'

export class TabsService {
  // eslint-disable-next-line no-useless-constructor
  constructor (private parent: VaTabs) {
    this.disabled = parent.disabled
  }

  tabs: VaTab[] = []
  disabled = false

  register (tab: VaTab) {
    const idx = this.tabs.push(tab)
    tab.id = tab.$props.name || idx
  }

  unregister (tab: VaTab) {
    this.tabs = this.tabs.filter((filteredTab) => filteredTab.id !== tab.id)
    this.tabs.forEach((tab, idx) => {
      tab.id = tab.$props.name || idx
    })
  }

  tabClick (tab: VaTab) {
    this.parent.selectTab(tab)
  }

  tabFocus (tab: VaTab) {
    this.parent.moveToTab(tab)
  }

  tabPressEnter (tab: VaTab) {
    this.parent.selectTab(tab)
  }
}

class TabsProps {
  modelValue = prop<string | number>({ type: [String, Number], default: null })
  left = prop<boolean>({ type: Boolean, default: true })
  right = prop<boolean>({ type: Boolean, default: false })
  center = prop<boolean>({ type: Boolean, default: false })
  grow = prop<boolean>({ type: Boolean, default: false })
  disabled = prop<boolean>({ type: Boolean, default: false })
  hideSlider = prop<boolean>({ type: Boolean, default: false })
  vertical = prop<boolean>({ type: Boolean, default: false })
  color = prop<string>({ type: String, default: 'primary' })
  prevIcon = prop<string>({ type: String, default: 'chevron_left' })
  nextIcon = prop<string>({ type: String, default: 'chevron_right' })
}

const TabsPropsMixin = Vue.with(TabsProps)

export const TabsServiceKey = Symbol('TabsService')

@Options({
  name: 'VaTabs',
  components: { VaButton },
})
export default class VaTabs extends mixins(
  ColorMixin,
  StatefulMixin,
  TabsPropsMixin,
) {
  @Ref('wrapper') wrapperRef!: Element
  @Ref('container') containerRef!: Element
  @Ref('tabs') tabsRef!: Element

  sliderHeight: null | number = null
  sliderWidth: null | number = null
  sliderOffsetX = 0
  sliderOffsetY = 0
  showPagination = false
  tabsContentOffset = 0
  resizeObserver: ResizeObserver | null = null
  startingXPoint = 0
  animationIncluded = false

  context = setup(() => {
    const tabsService = ref<TabsService | null>(null)

    const tabConfig = reactive({
      VaTab: {
        color: this.color,
      },
    })

    provide(TabsServiceKey, tabsService)

    return {
      tabsService,
      tabConfig,
    }
  })

  created () {
    // NOTE: this is just a temporary hack not to break everything
    // because we need to stick to `this` for now
    // TODO: move this logic to setup
    this.context.tabsService = new TabsService(this)

    watch(() => this.$props.modelValue, () => {
      this.updateTabsState()
    })
  }

  get computedClass () {
    const {
      left,
      right,
      center,
      grow,
      disabled,
    } = this.$props

    return {
      'va-tabs__container--left': left && !right && !center && !grow,
      'va-tabs__container--right': right,
      'va-tabs__container--center': center,
      'va-tabs__container--grow': grow,
      'va-tabs__container--disabled': disabled,
    }
  }

  get computedTabsClass () {
    return {
      'va-tabs--vertical': this.$props.vertical,
    }
  }

  get tabSelected () {
    return this.valueComputed
  }

  get sliderStyles () {
    if (this.$props.hideSlider) {
      return {}
    }
    const transition = this.animationIncluded ? 'var(--va-tabs-slider-wrapper-transition)' : ''
    if (this.$props.vertical) {
      return {
        'background-color': this.colorComputed,
        height: `${this.sliderHeight}px`,
        transform: `translateY(-${this.sliderOffsetY}px) translateX(${this.sliderOffsetX}px)`,
        transition,
      }
    }
    return {
      'background-color': this.colorComputed,
      width: `${this.sliderWidth}px`,
      transform: `translateY(-${this.sliderOffsetY}px) translateX(${this.sliderOffsetX}px)`,
      transition,
    }
  }

  get paginationControlledStyles () {
    // Prevents the movement of vertical tabs
    if (this.$props.vertical) {
      return {
        transform: 'translateX(0px)',
      }
    }
    const transition = this.animationIncluded ? 'transform ease 0.3s' : ''
    return {
      transform: `translateX(${this.startingXPoint - this.tabsContentOffset}px)`,
      transition,
    }
  }

  get disablePaginationLeft () {
    return this.tabsContentOffset === 0
  }

  get disablePaginationRight () {
    const lastTab = this.context.tabsService?.tabs[this.context.tabsService.tabs.length - 1]
    return (lastTab?.rightSidePosition || 0) <= this.tabsContentOffset + this.containerRef.clientWidth || (lastTab?.leftSidePosition || 0) <= this.tabsContentOffset
  }

  selectTab (tab: VaTab) {
    if (tab) {
      this.valueComputed = tab.$props.name || tab.id
      if (this.stateful) {
        this.updateTabsState()
      }
    }
  }

  updateTabsState () {
    this.resetSliderSizes()
    this.context.tabsService?.tabs.forEach((tab: VaTab) => {
      tab.updateSidePositions()
      if (this.tabSelected) {
        const isSelectedTab = (tab.$props.name || tab.id) === this.tabSelected
        tab.isActive = tab.isActiveRouterLink || isSelectedTab

        if (tab.isActive) {
          this.moveToTab(tab)
          this.updateSlider(tab)
        }
      }
    })
    if (this.tabsContentOffset + this.containerRef.clientWidth > this.tabsRef.clientWidth && this.context.tabsService) {
      this.moveToTab(this.context.tabsService.tabs[0])
    }
    this.updateStartingXPoint()
  }

  updatePagination () {
    this.showPagination = false
    if (this.tabsRef && this.wrapperRef) {
      if (this.tabsRef.clientWidth > this.wrapperRef.clientWidth) {
        this.showPagination = true
      }
    }
  }

  movePaginationLeft () {
    let offsetToSet = this.tabsContentOffset - this.containerRef.clientWidth

    if (this.context.tabsService) {
      for (let i = 0; i < this.context.tabsService.tabs.length - 1; i++) {
        if ((this.context.tabsService.tabs[i].leftSidePosition > offsetToSet && this.context.tabsService.tabs[i].leftSidePosition < this.tabsContentOffset) || this.context.tabsService.tabs[i + 1].leftSidePosition >= this.tabsContentOffset) {
          offsetToSet = this.context.tabsService.tabs[i].leftSidePosition
          break
        }
      }
    }

    this.tabsContentOffset = Math.max(0, offsetToSet)
  }

  movePaginationRight () {
    const containerRightSide = this.tabsContentOffset + this.containerRef.clientWidth
    let offsetToSet = containerRightSide

    if (this.context.tabsService) {
      for (let i = 0; i < this.context.tabsService.tabs.length; i++) {
        if (this.context.tabsService.tabs[i].rightSidePosition > containerRightSide) {
          offsetToSet = this.context.tabsService.tabs[i].leftSidePosition
          if (this.tabsContentOffset < offsetToSet) {
            break
          }
        }
      }
    }

    const lastTab = this.context.tabsService?.tabs[this.context.tabsService.tabs.length - 1]
    const maxOffset = (lastTab?.rightSidePosition || 0) - this.containerRef.clientWidth

    offsetToSet = Math.min(maxOffset, offsetToSet)
    this.tabsContentOffset = Math.max(0, offsetToSet)
  }

  moveToTab (tab: VaTab) {
    if (this.showPagination && tab.leftSidePosition + this.containerRef.clientWidth <= this.tabsRef.clientWidth) {
      this.tabsContentOffset = tab.leftSidePosition
    } else if (this.showPagination && tab.rightSidePosition >= this.containerRef.clientWidth) {
      this.tabsContentOffset = tab.rightSidePosition - this.containerRef.clientWidth
    } else {
      this.tabsContentOffset = 0
    }
  }

  updateSlider (tab: VaTab) {
    if (this.$props.vertical) {
      this.sliderOffsetY = (this.containerRef.clientHeight - tab.$el.offsetTop - tab.$el.clientHeight)
      this.sliderHeight = tab.$el.clientHeight
      this.sliderOffsetX = 0
      this.sliderWidth = null
    } else {
      this.sliderOffsetX = tab.$el.offsetLeft
      this.sliderWidth = tab.$el.clientWidth
      this.sliderOffsetY = 0
      this.sliderHeight = null
    }
  }

  resetSliderSizes () {
    this.sliderWidth = 0
    this.sliderHeight = 0
  }

  updateStartingXPoint () {
    this.startingXPoint = 0
    if (!this.showPagination) {
      return
    }
    if (this.$props.right) {
      this.startingXPoint = this.tabsRef?.clientWidth - this.containerRef?.clientWidth
    } else if (this.$props.center) {
      this.startingXPoint = Math.floor((this.tabsRef?.clientWidth - this.containerRef?.clientWidth) / 2)
    }
  }

  includeAnimation () {
    if (!this.animationIncluded) {
      requestAnimationFrame(() => {
        this.animationIncluded = true
      })
    }
  }

  redrawTabs () {
    const oldShowPaginationValue = this.showPagination
    this.updatePagination()
    if (oldShowPaginationValue === this.showPagination) {
      this.updateTabsState()
      this.includeAnimation()
    } else {
      requestAnimationFrame(() => {
        this.updateTabsState()
        this.includeAnimation()
      })
    }
  }

  mounted () {
    this.redrawTabs()
    requestAnimationFrame(() => {
      this.resizeObserver = new ResizeObserver(this.redrawTabs)
      this.resizeObserver.observe(this.wrapperRef)
      this.resizeObserver.observe(this.tabsRef)
    })
  }

  beforeUnmount () {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/resources";
@import 'variables';

.va-tabs {
  position: var(--va-tabs-position);
  font-family: var(--va-font-family);

  &__wrapper {
    overflow: hidden;
    contain: content;
    display: flex;
    flex: 1 1 auto;
  }

  .va-tabs__pagination {
    flex: 0 0 auto;
  }

  .va-tabs__container {
    overflow: var(--va-tabs-container-overflow);
    flex: var(--va-tabs-container-flex);
    display: var(--va-tabs-container-display);
    height: var(--va-tabs-container-height);
    margin: var(--va-tabs-container-margin);
    white-space: var(--va-tabs-container-white-space);
    position: var(--va-tabs-container-position);

    .va-tabs__tabs {
      position: absolute;
      height: 100%;
    }

    .va-tabs__tabs-items {
      display: flex;
    }

    &--right {
      justify-content: flex-end;
    }

    &--grow {
      .va-tabs__tabs {
        display: flex;
        min-width: 100%;
      }

      .va-tab {
        flex: 1 0 auto;
        max-width: none;
      }
    }

    &--center {
      justify-content: center;
    }

    &--disabled {
      @include va-disabled();

      pointer-events: none;
    }
  }

  &--vertical {
    .va-tabs__wrapper {
      flex: 0 0 auto;
    }

    .va-tabs__container {
      height: auto;

      .va-tabs__tabs-items {
        flex-direction: column;
      }

      .va-tabs__tabs {
        position: relative;
      }
    }

    .va-tab {
      display: flex;

      &__content {
        flex: 0 0 auto;
      }
    }

    .va-tabs__content {
      flex: 1 0 auto;
    }
  }

  .va-tabs__slider-wrapper {
    bottom: var(--va-tabs-slider-wrapper-bottom);
    margin: var(--va-tabs-slider-wrapper-margin);
    position: var(--va-tabs-slider-wrapper-position);
    z-index: var(--va-tabs-slider-wrapper-z-index);

    .va-tabs__slider {
      width: var(--va-tabs-slider-width);
      height: var(--va-tabs-slider-height);
    }
  }
}
</style>
