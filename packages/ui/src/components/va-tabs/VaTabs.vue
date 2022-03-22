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

          <va-config :components="tabConfig">
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
import { computed, defineComponent, provide, reactive, ref, watch } from 'vue'
import { useStateful, useStatefulProps } from '../../composables/useStateful'
import { TabsServiceKey } from './types'
import { useColor } from '../../composables/useColor'
import VaButton from '../va-button'
import VaConfig from '../va-config'

const getClientWidth = (element: Element | null | undefined): number => element?.clientWidth || 0

export class TabsService {
  // eslint-disable-next-line no-useless-constructor
  constructor (private parent: any) {
    this.disabled = parent.disabled
  }

  tabs: any[] = []
  disabled = false

  register (tab: any) {
    const idx = this.tabs.push(tab)
    tab.id = tab.$props.name || idx
  }

  unregister (tab: any) {
    this.tabs = this.tabs.filter((filteredTab) => filteredTab.id !== tab.id)
    this.tabs.forEach((tab, idx) => {
      tab.id = tab.$props.name || idx
    })
  }

  tabClick (tab: any) {
    this.parent.selectTab(tab)
  }

  tabFocus (tab: any) {
    this.parent.moveToTab(tab)
  }

  tabPressEnter (tab: any) {
    this.parent.selectTab(tab)
  }
}

export default defineComponent({
  name: 'VaTabs',
  components: { VaButton, VaConfig },
  emits: ['update:modelValue', 'click:next', 'click:prev'],

  props: {
    ...useStatefulProps,
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
  },

  setup: (props, ctx) => {
    const wrapper = ref<Element>()
    const container = ref<Element>()
    const tabs = ref<Element>()

    const sliderHeight = ref<number | null>(null)
    const sliderWidth = ref<number | null>(null)
    const sliderOffsetX = ref(0)
    const sliderOffsetY = ref(0)
    const showPagination = ref(false)
    const tabsContentOffset = ref(0)
    const resizeObserver = ref<ResizeObserver | null>(null)
    const startingXPoint = ref(0)
    const animationIncluded = ref(false)
    const { colorComputed } = useColor(props)
    const { valueComputed } = useStateful(props, ctx.emit)
    const tabsService = ref<TabsService | null>(null)

    const tabConfig = reactive({
      VaTab: {
        color: props.color,
      },
    })

    provide(TabsServiceKey, tabsService)

    const computedClass = computed(() => {
      const {
        left,
        right,
        center,
        grow,
        disabled,
      } = props

      return {
        'va-tabs__container--left': left && !right && !center && !grow,
        'va-tabs__container--right': right,
        'va-tabs__container--center': center,
        'va-tabs__container--grow': grow,
        'va-tabs__container--disabled': disabled,
      }
    })

    const computedTabsClass = computed(() => ({ 'va-tabs--vertical': props.vertical }))

    const tabSelected = computed(() => valueComputed)

    const sliderStyles = computed(() => {
      if (props.hideSlider) {
        return { display: 'none' }
      }

      const transition = animationIncluded.value ? 'var(--va-tabs-slider-wrapper-transition)' : ''

      if (props.vertical) {
        return {
          'background-color': colorComputed.value,
          height: `${sliderHeight.value}px`,
          transform: `translateY(-${sliderOffsetY.value}px) translateX(${sliderOffsetX.value}px)`,
          transition,
        }
      }

      return {
        'background-color': colorComputed.value,
        width: `${sliderWidth.value}px`,
        transform: `translateY(-${sliderOffsetY.value}px) translateX(${sliderOffsetX.value}px)`,
        transition,
      }
    })

    const paginationControlledStyles = computed(() => {
      // Prevents the movement of vertical tabs
      if (props.vertical) {
        return {
          transform: 'translateX(0px)',
        }
      }

      const transition = animationIncluded.value ? 'transform ease 0.3s' : ''

      return {
        transform: `translateX(${startingXPoint.value - tabsContentOffset.value}px)`,
        transition,
      }
    })

    const disablePaginationLeft = computed(() => tabsContentOffset.value === 0)

    const disablePaginationRight = computed(() => {
      const lastTab = tabsService.value?.tabs[tabsService.value.tabs.length - 1]
      const containerClientWidth = getClientWidth(container.value)

      return (lastTab?.rightSidePosition || 0) <= tabsContentOffset.value + containerClientWidth || (lastTab?.leftSidePosition || 0) <= tabsContentOffset.value
    })

    return {
      wrapper,
      container,
      tabs,
      sliderHeight,
      sliderWidth,
      sliderOffsetX,
      sliderOffsetY,
      showPagination,
      tabsContentOffset,
      resizeObserver,
      startingXPoint,
      animationIncluded,
      colorComputed,
      valueComputed,
      tabsService,
      tabConfig,
      computedClass,
      computedTabsClass,
      // Computed
      tabSelected,
      sliderStyles,
      paginationControlledStyles,
      disablePaginationLeft,
      disablePaginationRight,
    }
  },

  created () {
    // NOTE: this is just a temporary hack not to break everything
    // because we need to stick to `this` for now
    // TODO: move this logic to setup
    this.tabsService = new TabsService(this)

    watch(() => this.$props.modelValue, () => {
      this.updateTabsState()
    })
  },

  mounted () {
    this.redrawTabs()

    requestAnimationFrame(() => {
      this.resizeObserver = new ResizeObserver(this.redrawTabs)
      this.wrapper && this.resizeObserver.observe(this.wrapper)
      this.tabs && this.resizeObserver.observe(this.tabs)
    })
  },

  beforeUnmount () {
    this.resizeObserver?.disconnect()
  },

  methods: {
    selectTab (tab: any) {
      if (tab) {
        this.valueComputed = tab.$props.name || tab.id

        if (this.stateful) {
          this.updateTabsState()
        }
      }
    },

    updateTabsState () {
      this.resetSliderSizes()

      this.tabsService?.tabs.forEach((tab: any) => {
        tab.updateSidePositions()

        if (this.tabSelected) {
          const isSelectedTab = (tab.$props.name || tab.id) === this.tabSelected.value

          tab.isActive = tab.isActiveRouterLink || isSelectedTab

          if (tab.isActive) {
            this.moveToTab(tab)
            this.updateSlider(tab)
          }
        }
      })

      const containerClientWidth = getClientWidth(this.container)
      const tabsClientWidth = getClientWidth(this.tabs)

      if (this.tabsContentOffset + containerClientWidth > tabsClientWidth && this.tabsService) {
        this.moveToTab(this.tabsService.tabs[0])
      }

      this.updateStartingXPoint()
    },

    updatePagination () {
      this.showPagination = false
      if (this.tabs && this.wrapper) {
        if (this.tabs.clientWidth > this.wrapper.clientWidth) {
          this.showPagination = true
        }
      }
    },

    movePaginationLeft () {
      const containerClientWidth = getClientWidth(this.container)
      let offsetToSet = this.tabsContentOffset - containerClientWidth

      if (this.tabsService) {
        for (let i = 0; i < this.tabsService.tabs.length - 1; i++) {
          if (
            (this.tabsService.tabs[i].leftSidePosition > offsetToSet && this.tabsService.tabs[i].leftSidePosition < this.tabsContentOffset) ||
            this.tabsService.tabs[i + 1].leftSidePosition >= this.tabsContentOffset
          ) {
            offsetToSet = this.tabsService.tabs[i].leftSidePosition
            break
          }
        }
      }

      this.tabsContentOffset = Math.max(0, offsetToSet)

      this.$emit('click:prev')
    },

    movePaginationRight () {
      const containerClientWidth = getClientWidth(this.container)
      const containerRightSide = this.tabsContentOffset + containerClientWidth
      let offsetToSet = containerRightSide

      if (this.tabsService) {
        for (let i = 0; i < this.tabsService.tabs.length; i++) {
          if (this.tabsService.tabs[i].rightSidePosition > containerRightSide) {
            offsetToSet = this.tabsService.tabs[i].leftSidePosition
            if (this.tabsContentOffset < offsetToSet) {
              break
            }
          }
        }
      }

      const lastTab = this.tabsService?.tabs[this.tabsService.tabs.length - 1]
      const maxOffset = (lastTab?.rightSidePosition || 0) - containerClientWidth

      offsetToSet = Math.min(maxOffset, offsetToSet)
      this.tabsContentOffset = Math.max(0, offsetToSet)

      this.$emit('click:next')
    },

    moveToTab (tab: any) {
      const containerClientWidth = getClientWidth(this.container)
      const tabsClientWidth = getClientWidth(this.tabs)

      if (this.showPagination && tab.leftSidePosition + containerClientWidth <= tabsClientWidth) {
        this.tabsContentOffset = tab.leftSidePosition
      } else if (this.showPagination && tab.rightSidePosition >= containerClientWidth) {
        this.tabsContentOffset = tab.rightSidePosition - containerClientWidth
      } else {
        this.tabsContentOffset = 0
      }
    },

    updateSlider (tab: any) {
      if (this.$props.vertical) {
        const containerClientHeight = this.container?.clientHeight || 0
        const sliderOffsetY = containerClientHeight - tab.$el.offsetTop - tab.$el.clientHeight

        this.sliderOffsetY = Math.max(sliderOffsetY, 0)
        this.sliderHeight = tab.$el.clientHeight
        this.sliderOffsetX = 0
        this.sliderWidth = null
      } else {
        this.sliderOffsetX = tab.$el.offsetLeft
        this.sliderWidth = tab.$el.clientWidth
        this.sliderOffsetY = 0
        this.sliderHeight = null
      }
    },

    resetSliderSizes () {
      this.sliderWidth = 0
      this.sliderHeight = 0
    },

    updateStartingXPoint () {
      this.startingXPoint = 0

      if (!this.showPagination) {
        return
      }

      const containerClientWidth = getClientWidth(this.container)
      const tabsClientWidth = getClientWidth(this.tabs)

      if (this.$props.right) {
        this.startingXPoint = tabsClientWidth - containerClientWidth
      } else if (this.$props.center) {
        this.startingXPoint = Math.floor((tabsClientWidth - containerClientWidth) / 2)
      }
    },

    includeAnimation () {
      if (!this.animationIncluded) {
        requestAnimationFrame(() => {
          this.animationIncluded = true
        })
      }
    },

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
    },
  },
})
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
