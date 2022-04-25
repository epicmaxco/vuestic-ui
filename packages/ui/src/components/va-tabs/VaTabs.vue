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
            <div class="va-tabs__tabs-items">
              <slot name="tabs"></slot>
            </div>
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
import {
  computed,
  defineComponent,
  provide,
  reactive,
  ref,
  unref,
  watch,
  Ref,
} from 'vue'
import VaButton from '../va-button'
import VaConfig from '../va-config'
import { useStateful, useStatefulProps } from '../../composables/useStateful'
import { useColor } from '../../composables/useColor'
import { TabsViewKey, TabComponent } from './types'
import { useResizeObserver } from '../../composables/useResizeObserver'

const getClientWidth = (element: HTMLElement | null | undefined): number => element?.clientWidth || 0

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

  setup: (props, { emit }) => {
    const wrapper = ref<HTMLElement | null>(null)
    const container = ref<HTMLElement | null>(null)
    const tabs = ref<HTMLElement | null>(null)

    const tabsList: Ref<TabComponent[]> = ref([])
    const sliderHeight = ref<number | null>(null)
    const sliderWidth = ref<number | null>(null)
    const sliderOffsetX = ref(0)
    const sliderOffsetY = ref(0)
    const showPagination = ref(false)
    const tabsContentOffset = ref(0)
    const startingXPoint = ref(0)
    const animationIncluded = ref(false)
    const { colorComputed } = useColor(props)
    const { valueComputed: tabSelected }: { valueComputed: Ref<string | number | null> } = useStateful(props, emit)
    const tabConfig = reactive({
      VaTab: {
        color: props.color,
      },
    })

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

    const sliderStyles = computed(() => {
      if (props.hideSlider) {
        return { display: 'none' }
      }

      return {
        backgroundColor: colorComputed.value,
        height: props.vertical ? `${sliderHeight.value}px` : '',
        width: props.vertical ? '' : `${sliderWidth.value}px`,
        transform: `translateY(-${sliderOffsetY.value}px) translateX(${sliderOffsetX.value}px)`,
        transition: animationIncluded.value ? 'var(--va-tabs-slider-wrapper-transition)' : '',
      }
    })

    const paginationControlledStyles = computed(() => {
      // Prevents the movement of vertical tabs
      if (props.vertical) {
        return {
          transform: 'translateX(0px)',
        }
      }

      return {
        transform: `translateX(${startingXPoint.value - tabsContentOffset.value}px)`,
        transition: animationIncluded.value ? 'var(--va-tabs-slider-transition)' : '',
      }
    })

    const disablePaginationLeft = computed(() => tabsContentOffset.value === 0)

    const disablePaginationRight = computed(() => {
      const lastTab = tabsList.value[tabsList.value.length - 1]
      const leftSidePosition = unref(lastTab.leftSidePosition)
      const rightSidePosition = unref(lastTab.rightSidePosition)
      const containerClientWidth = getClientWidth(container.value)

      return rightSidePosition <= tabsContentOffset.value + containerClientWidth ||
        leftSidePosition <= tabsContentOffset.value
    })

    // Methods
    const resetSliderSizes = () => {
      sliderWidth.value = 0
      sliderHeight.value = 0
    }

    const moveToTab = (tab: TabComponent) => {
      const containerClientWidth = getClientWidth(container.value)
      const tabsClientWidth = getClientWidth(tabs.value)
      const leftSidePosition = unref(tab.leftSidePosition)
      const rightSidePosition = unref(tab.rightSidePosition)

      if (showPagination.value && leftSidePosition + containerClientWidth <= tabsClientWidth) {
        tabsContentOffset.value = leftSidePosition
      } else if (showPagination.value && rightSidePosition >= containerClientWidth) {
        tabsContentOffset.value = rightSidePosition - containerClientWidth
      } else {
        tabsContentOffset.value = 0
      }
    }

    const updateStartingXPoint = () => {
      startingXPoint.value = 0

      if (!showPagination.value) {
        return
      }

      const containerClientWidth = getClientWidth(container.value)
      const tabsClientWidth = getClientWidth(tabs.value)

      if (props.right) {
        startingXPoint.value = tabsClientWidth - containerClientWidth
      } else if (props.center) {
        startingXPoint.value = Math.floor((tabsClientWidth - containerClientWidth) / 2)
      }
    }

    const updateTabsState = () => {
      resetSliderSizes()

      tabsList.value.forEach((tab: TabComponent) => {
        tab.updateSidePositions()

        const isTabSelected = (tab.name?.value || tab.id) === tabSelected.value

        tab.isActive = tab.isActiveRouterLink || isTabSelected

        if (tab.isActive) {
          moveToTab(tab)
          updateSlider(tab)
        }
      })

      const containerClientWidth = getClientWidth(container.value)
      const tabsClientWidth = getClientWidth(tabs.value)

      if (tabsContentOffset.value + containerClientWidth > tabsClientWidth && tabsList.value) {
        moveToTab(tabsList.value[0])
      }

      updateStartingXPoint()
    }

    const updatePagination = () => {
      const tabsClientWidth = getClientWidth(tabs.value)
      const wrapperClientWidth = getClientWidth(wrapper.value)

      showPagination.value = !!(tabs.value && wrapper.value && tabsClientWidth > wrapperClientWidth)
    }

    const movePaginationLeft = () => {
      const containerClientWidth = getClientWidth(container.value)
      let offsetToSet = tabsContentOffset.value - containerClientWidth

      if (tabsList.value) {
        for (let i = 0; i < tabsList.value.length - 1; i++) {
          const currentTabLeftSidePosition = unref(tabsList.value[i]?.leftSidePosition)
          const nextTabLeftSidePosition = unref(tabsList.value[i + 1]?.leftSidePosition)

          if (
            (currentTabLeftSidePosition > offsetToSet && currentTabLeftSidePosition < tabsContentOffset.value) ||
            nextTabLeftSidePosition >= tabsContentOffset.value
          ) {
            offsetToSet = currentTabLeftSidePosition
            break
          }
        }
      }

      tabsContentOffset.value = Math.max(0, offsetToSet)

      emit('click:prev')
    }

    const movePaginationRight = () => {
      const containerClientWidth = getClientWidth(container.value)
      const containerRightSide = tabsContentOffset.value + containerClientWidth
      let offsetToSet = containerRightSide

      if (tabsList.value) {
        for (let i = 0; i < tabsList.value.length - 1; i++) {
          const rightSidePosition = unref(tabsList.value[i].rightSidePosition)

          if (rightSidePosition > containerRightSide) {
            offsetToSet = unref(tabsList.value[i].leftSidePosition)

            if (tabsContentOffset.value < offsetToSet) {
              break
            }
          }
        }
      }

      const rightSidePosition = unref(tabsList.value[tabsList.value.length - 1]?.rightSidePosition)
      const maxOffset = rightSidePosition - containerClientWidth

      offsetToSet = Math.min(maxOffset, offsetToSet)
      tabsContentOffset.value = Math.max(0, offsetToSet)

      emit('click:next')
    }

    const updateSlider = (tab: TabComponent) => {
      const tabElement = unref(tab.tabElement)
      const tabOffsetTop = tabElement?.offsetTop || 0
      const tabOffsetLeft = tabElement?.offsetLeft || 0
      const tabClientHeight = tabElement?.clientHeight || 0
      const tabClientWidth = tabElement?.clientWidth || 0

      if (props.vertical) {
        const containerClientHeight = container.value?.clientHeight || 0
        const calculatedSliderOffsetY = containerClientHeight - tabOffsetTop - tabClientHeight

        sliderOffsetY.value = Math.max(calculatedSliderOffsetY, 0)
        sliderHeight.value = tabClientHeight
        sliderOffsetX.value = 0
        sliderWidth.value = 0
      } else {
        sliderOffsetX.value = tabOffsetLeft
        sliderWidth.value = tabClientWidth
        sliderOffsetY.value = 0
        sliderHeight.value = 0
      }
    }

    const includeAnimation = () => {
      if (!animationIncluded.value) {
        requestAnimationFrame(() => {
          animationIncluded.value = true
        })
      }
    }

    const redrawTabs = () => {
      const oldShowPaginationValue = showPagination.value

      updatePagination()

      if (oldShowPaginationValue === showPagination.value) {
        updateTabsState()
        includeAnimation()
      } else {
        requestAnimationFrame(() => {
          updateTabsState()
          includeAnimation()
        })
      }
    }

    const selectTab = (tab: TabComponent) => {
      if (!tab) { return }

      tabSelected.value = tab.name?.value || tab.id

      if (props.stateful) {
        updateTabsState()
      }
    }

    const registerTab = (tab: TabComponent) => {
      const idx = tabsList.value.push(tab) - 1

      tab.id = tab.name?.value || idx
    }

    const unregisterTab = (tab: TabComponent) => {
      tabsList.value = tabsList.value.filter((filteredTab: TabComponent) => filteredTab.id !== tab.id)

      tabsList.value.forEach((tabListItem: TabComponent, idx: number) => {
        tabListItem.id = tabListItem.name?.value || idx
      })
    }

    provide(TabsViewKey, {
      parentDisabled: props.disabled,
      selectTab,
      moveToTab,
      registerTab,
      unregisterTab,
    })

    // Lifecycle hooks
    watch(() => props.modelValue, () => {
      updateTabsState()
    })

    const resizeObserver = useResizeObserver([wrapper, tabs], redrawTabs)

    return {
      wrapper,
      container,
      tabs,
      tabsList,
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
      tabConfig,
      computedClass,
      computedTabsClass,
      tabSelected,
      sliderStyles,
      paginationControlledStyles,
      disablePaginationLeft,
      disablePaginationRight,
      resetSliderSizes,
      moveToTab,
      updateStartingXPoint,
      updateTabsState,
      updatePagination,
      movePaginationLeft,
      movePaginationRight,
      updateSlider,
      includeAnimation,
      redrawTabs,
      selectTab,
    }
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
