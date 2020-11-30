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
          :icon="c_prevIcon"
          @click="movePaginationLeft"
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
          :icon="c_nextIcon"
          @click="movePaginationRight"
        />
      </div>
      <div class="va-tabs__content">
          <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'
import { Mixins, Watch, Ref } from 'vue-property-decorator'
import { Options } from 'vue-class-component'
import VaButton from '../va-button/VaButton.vue'
import VaTab from './VaTab.vue'

export class TabsService {
  // eslint-disable-next-line no-useless-constructor
  constructor (private parent: VaTabs) {}

  tabs: VaTab[] = []

  register (tab: VaTab | any) {
    const idx = this.tabs.push(tab)
    tab.id = tab.$props.name || idx
  }

  unregister (tab: VaTab) {
    this.tabs = this.tabs.filter((t: { id: any }) => t.id === tab.id)
    // eslint-disable-next-line no-return-assign
    this.tabs.forEach((t: VaTab | any, idx: number) => t.id = t.$props.name || idx)
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

const TabsPropsMixin = makeContextablePropsMixin({
  modelValue: { type: [String, Number], default: null },
  left: { type: Boolean, default: true },
  right: { type: Boolean, default: false },
  center: { type: Boolean, default: false },
  grow: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  hideSlider: { type: Boolean, default: false },
  vertical: { type: Boolean, default: false },
  color: { type: String, default: 'primary' },
  prevIcon: { type: String, default: 'chevron_left' },
  nextIcon: { type: String, default: 'chevron_right' },
})

@Options({
  name: 'VaTabs',
  components: { VaButton },
  provide () {
    this.tabsService = new TabsService(this)
    return {
      tabsService: this.tabsService,
    }
  },
})
export default class VaTabs extends Mixins(
  ColorThemeMixin,
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

  get computedClass () {
    return {
      'va-tabs__container--left': this.c_left && !this.c_right && !this.c_center && !this.c_grow,
      'va-tabs__container--right': this.c_right,
      'va-tabs__container--center': this.c_center,
      'va-tabs__container--grow': this.c_grow,
      'va-tabs__container--disabled': this.c_disabled,
    }
  }

  get computedTabsClass () {
    return {
      'va-tabs--vertical': this.c_vertical,
    }
  }

  get tabSelected () {
    return this.valueComputed
  }

  get sliderStyles () {
    if (this.c_hideSlider) {
      return {
      }
    }
    if (this.c_vertical) {
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
    if (this.c_vertical) {
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
    return this.tabsService.tabs[this.tabsService.tabs.length - 1].rightSidePosition <= this.tabsContentOffset + this.containerRef.clientWidth
  }

  @Watch('modelValue')
  onValueChanged () {
    this.updateTabsState()
  }

  selectTab (tab: any) {
    this.valueComputed = tab.$props.name || tab.id
    if (this.stateful) {
      this.updateTabsState()
    }
  }

  updateTabsState () {
    let hasActive = false
    for (let i = 0; i < this.tabsService.tabs.length; i++) {
      if (this.tabsService.tabs[i].isActiveRouterLink) {
        this.ensureVisible(this.tabsService.tabs[i])
        this.updateSlider(this.tabsService.tabs[i])
        hasActive = true
        this.tabsService.tabs[i].isActive = true
      } else if (((this as any).tabsService.tabs[i].$props.name || this.tabsService.tabs[i].id) === this.tabSelected) {
        hasActive = true
        this.ensureVisible(this.tabsService.tabs[i])
        this.updateSlider(this.tabsService.tabs[i])
        this.tabsService.tabs[i].isActive = true
      } else {
        this.tabsService.tabs[i].isActive = false
      }
    }
    if (!hasActive) {
      this.resetSlider()
    }
  }

  updatePagination () {
    this.showPagination = false
    if (this.tabsRef && this.wrapperRef) {
      if (this.tabsRef.clientWidth > this.wrapperRef.clientWidth) { this.showPagination = true }
    }
  }

  movePaginationLeft () {
    let offsetToSet = this.tabsContentOffset - this.containerRef.clientWidth

    for (let i = 0; i < this.tabsService.tabs.length; i++) {
      if (this.tabsService.tabs[i].rightSidePosition > this.tabsContentOffset && this.tabsService.tabs[i].leftSidePosition < this.tabsContentOffset) {
        offsetToSet = this.tabsService.tabs[i].rightSidePosition - this.containerRef.clientWidth
      }
    }

    this.tabsContentOffset = offsetToSet < 0 ? 0 : offsetToSet
  }

  movePaginationRight () {
    const containerRightSide = this.tabsContentOffset + this.containerRef.clientWidth
    let offsetToSet = containerRightSide

    for (let i = 0; i < this.tabsService.tabs.length; i++) {
      if (this.tabsService.tabs[i].rightSidePosition > containerRightSide && this.tabsService.tabs[i].leftSidePosition < containerRightSide) {
        offsetToSet = this.tabsService.tabs[i].leftSidePosition
      }
    }

    const maxOffset = this.tabsService.tabs[this.tabsService.tabs.length - 1].rightSidePosition - this.containerRef.clientWidth

    offsetToSet = offsetToSet >= maxOffset ? maxOffset : offsetToSet
    this.tabsContentOffset = offsetToSet < 0 ? 0 : offsetToSet
  }

  ensureVisible (tab: any) {
    if (tab.leftSidePosition < this.tabsContentOffset) {
      this.tabsContentOffset = tab.leftSidePosition
    } else if (tab.rightSidePosition > this.tabsContentOffset + this.containerRef.clientWidth) {
      this.tabsContentOffset = tab.rightSidePosition - this.containerRef.clientWidth
    }
  }

  updateSlider (tab: any) {
    if (this.c_vertical) {
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

  resetSlider () {
    this.sliderOffsetX = 0
    this.sliderWidth = 0
    this.sliderOffsetY = 0
    this.sliderHeight = 0
  }

  mounted () {
    window.addEventListener('resize', this.updateTabsState)
    this.parseItems()
    this.updateTabsState()
    this.updatePagination()
    this.mutationObserver = new MutationObserver(() => {
      this.updateTabsState()
    })
    this.mutationObserver.observe(this.tabsRef, { childList: true, subtree: true })
  }

  beforeUnmount () {
    if (this.mutationObserver) { this.mutationObserver.disconnect() }
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
