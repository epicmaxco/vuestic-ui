<template>
  <div
    class="va-tabs"
    :class="computedTabsClass"
  >
    <div class="va-tabs__wrapper">
      <div
        class="va-tabs__tabs-wrapper"
        ref="wrapper"
      >
        <va-button
          v-if="showPagination"
          :disabled="disablePaginationLeft"
          class="va-tabs__pagination"
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
            <slot
              name="tabs"
              class="va-tabs__tabs-items"
            />
          </div>
        </div>
        <va-button
          v-if="showPagination"
          :disabled="disablePaginationRight"
          class="va-tabs__pagination"
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
  </div>
</template>

<script lang="ts">
import { provide, watch, ref } from 'vue'
import { Options, Vue, prop, mixins, setup } from 'vue-class-component'

import { Ref } from '../../../utils/decorators'
import ColorMixin from '../../../services/color-config/ColorMixin'
import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'
import VaButton from '../va-button'
import VaTab from './VaTab/VaTab.vue'

export class TabsService {
  // eslint-disable-next-line no-useless-constructor
  constructor (private parent: VaTabs) {
  }

  tabs: VaTab[] = []

  register (tab: VaTab | any) {
    const idx = this.tabs.push(tab)
    tab.id = tab.$props.name || idx
  }

  unregister (tab: VaTab) {
    this.tabs = this.tabs.filter((filteredTab: { id: any }) => filteredTab.id !== tab.id)
    // eslint-disable-next-line no-return-assign
    this.tabs.forEach((tab: VaTab | any, idx: number) => tab.id = tab.$props.name || idx)
  }

  tabClick (tab: VaTab) {
    this.parent.selectTab(tab)
  }

  tabFocus (tab: VaTab) {
    this.parent.ensureVisible(tab)
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

  tabs: any = []
  sliderHeight: null | number = null
  sliderWidth: null | number = null
  sliderOffsetX = 0
  sliderOffsetY = 0
  showPagination = false
  tabsContentOffset = 0
  mutationObserver: any = null

  context = setup(() => {
    const tabsService = ref<TabsService | null>(null)

    provide(TabsServiceKey, tabsService)

    return {
      tabsService,
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
    if (this.$props.vertical) {
      return {
        'background-color': this.colorComputed,
        height: `${this.sliderHeight}px`,
        transform: `translateY(-${this.sliderOffsetY}px) translateX(${this.sliderOffsetX}px)`,
      }
    }
    return {
      'background-color': this.colorComputed,
      width: `${this.sliderWidth}px`,
      transform: `translateY(-${this.sliderOffsetY}px) translateX(${this.sliderOffsetX}px)`,
    }
  }

  get paginationControlledStyles () {
    // Prevents the movement of vertical tabs
    if (this.$props.vertical) {
      return {
        transform: 'translateX(0px)',
      }
    }
    return {
      transform: `translateX(-${this.tabsContentOffset}px)`,
    }
  }

  get disablePaginationLeft () {
    return this.tabsContentOffset === 0
  }

  get disablePaginationRight () {
    return this.context.tabsService?.tabs[this.context.tabsService.tabs.length - 1]?.rightSidePosition <= this.tabsContentOffset + this.containerRef.clientWidth
  }

  selectTab (tab: any) {
    if (tab) {
      this.valueComputed = tab.$props.name || tab.id
      if (this.stateful) {
        this.updateTabsState()
      }
    }
  }

  updateTabsState () {
    this.resetSliderSizes()
    this.updatePagination()

    this.context.tabsService?.tabs.forEach((tab: VaTab) => {
      const tabIsActiveRouterLink = tab.isActiveRouterLink
      const isSelectedTab = (tab.$props.name || tab.id) === this.tabSelected
      if (tabIsActiveRouterLink || isSelectedTab) {
        this.ensureVisible(tab)
        this.updateSlider(tab)

        tab.isActive = true
      } else {
        tab.isActive = false
      }
    })
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
      for (let i = 0; i < this.context.tabsService.tabs.length; i++) {
        if (this.context.tabsService.tabs[i].rightSidePosition > this.tabsContentOffset && this.context.tabsService.tabs[i].leftSidePosition < this.tabsContentOffset) {
          offsetToSet = this.context.tabsService.tabs[i].rightSidePosition - this.containerRef.clientWidth
        }
      }
    }

    this.tabsContentOffset = offsetToSet < 0 ? 0 : offsetToSet
  }

  movePaginationRight () {
    const containerRightSide = this.tabsContentOffset + this.containerRef.clientWidth
    let offsetToSet = containerRightSide

    if (this.context.tabsService) {
      for (let i = 0; i < this.context.tabsService.tabs.length; i++) {
        if (this.context.tabsService.tabs[i].rightSidePosition > containerRightSide && this.context.tabsService.tabs[i].leftSidePosition < containerRightSide) {
          offsetToSet = this.context.tabsService.tabs[i].leftSidePosition
        }
      }
    }

    const maxOffset = this.context.tabsService?.tabs[this.context.tabsService.tabs.length - 1].rightSidePosition - this.containerRef.clientWidth

    offsetToSet = offsetToSet >= maxOffset ? maxOffset : offsetToSet
    this.tabsContentOffset = offsetToSet < 0 ? 0 : offsetToSet
  }

  ensureVisible (tab: any) {
    if (tab.leftSidePosition < this.tabsContentOffset) {
      this.tabsContentOffset = tab.leftSidePosition
    } else if (tab.rightSidePosition > this.tabsContentOffset + this.containerRef.clientWidth) {
      this.tabsContentOffset = tab.rightSidePosition - this.containerRef.clientWidth
    } else if (tab.rightSidePosition - this.containerRef.clientWidth >= 0) {
      this.tabsContentOffset = tab.rightSidePosition - this.containerRef.clientWidth
    }
  }

  updateSlider (tab: any) {
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

  mounted () {
    window.addEventListener('resize', this.updateTabsState)
    this.updateTabsState()
    this.mutationObserver = new MutationObserver(() => {
      this.updateTabsState()
    })
    this.mutationObserver.observe(this.tabsRef, {
      childList: true,
      subtree: true,
    })
  }

  beforeUnmount () {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect()
    }
    window.removeEventListener('resize', this.updateTabsState)
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-tabs {
  position: relative;

  &__wrapper {
    display: flex;
  }

  &__tabs-wrapper {
    overflow: hidden;
    contain: content;
    display: flex;
    flex: 1 1 auto;
  }

  .va-tabs__pagination {
    flex: 0 0 auto;
  }

  .va-tabs__container {
    overflow: hidden;
    flex: 1 1 auto;
    display: flex;
    height: 2.5rem;
    margin: 0 3px;
    white-space: nowrap;
    position: relative;

    .va-tabs__tabs {
      position: absolute;
      transition: all ease 0.3s;
    }

    .va-tabs__tabs-items {
      display: flex;
    }

    &--right {
      justify-content: flex-end;
    }

    &--grow {
      .va-tabs__tabs {
        width: 100%;
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
    .va-tabs__tabs-wrapper {
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
    bottom: 0;
    margin: 0 !important;
    position: absolute;
    z-index: 4000;
    transition: $transition-primary;

    .va-tabs__slider {
      width: 0.125rem;
      height: 0.125rem;
    }
  }
}
</style>
