import { computed, ComputedRef, onBeforeUnmount, onMounted, provide, reactive, Ref, ref, SetupContext, watch } from 'vue'
import { useColor } from '../../../composables/useColor'
import { useStateful, StatefulProps } from '../../../composables/useStateful'
import { ClassComputed, ComputedStyle, TabsServiceKey, TabsViewKey } from '../types'
import { useTabsService } from './useTabsService'
import { TabComponent } from './useTab'

const getClientWidth = (element: HTMLElement | null | undefined): number => element?.clientWidth || 0

export interface TabsViewProps {
  modelValue: string | number,
  left: boolean,
  right: boolean,
  center: boolean,
  grow: boolean,
  disabled: boolean,
  hideSlider: boolean,
  vertical: boolean,
  color: string,
  prevIcon: string,
  nextIcon: string,
}

interface TabConfig {
  [prop: string]: {
    [prop: string]: unknown
  },
}

interface TabsView {
  wrapper: Ref<HTMLElement | null>,
  container: Ref<HTMLElement | null>,
  tabs: Ref<HTMLElement | null>,
  sliderHeight: Ref<number | null>,
  sliderWidth: Ref<number | null>,
  sliderOffsetX: Ref<number>,
  sliderOffsetY: Ref<number>,
  showPagination: Ref<boolean>,
  tabsContentOffset: Ref<number>,
  resizeObserver: Ref<ResizeObserver | null>,
  startingXPoint: Ref<number>,
  animationIncluded: Ref<boolean>,
  colorComputed: Ref<string>,
  valueComputed: Ref<string | null>,
  tabConfig: TabConfig,
  computedClass: Ref<ClassComputed>,
  computedTabsClass: Ref<ClassComputed>,
  tabSelected: ComputedRef<Ref<string | null>>,
  sliderStyles: ComputedRef<ComputedStyle>,
  paginationControlledStyles: ComputedRef<ComputedStyle>,
  disablePaginationLeft: Ref<boolean>,
  disablePaginationRight: Ref<boolean>,
  resetSliderSizes: () => void,
  moveToTab: (tab: TabComponent) => void,
  updateStartingXPoint: () => void,
  updateTabsState: (tab: TabComponent) => void,
  updatePagination: () => void,
  movePaginationLeft: () => void,
  movePaginationRight: () => void,
  updateSlider: (tab: TabComponent) => void,
  includeAnimation: () => void,
  redrawTabs: () => void,
  selectTab: (tab: TabComponent) => void,
}

const useTabsView = (props: TabsViewProps & StatefulProps<string | number>, { emit }: SetupContext): TabsView => {
  const wrapper = ref<HTMLElement | null>(null)
  const container = ref<HTMLElement | null>(null)
  const tabs = ref<HTMLElement | null>(null)

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
  const { valueComputed } = useStateful(props, emit)
  const tabsService = ref<any>()
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

  // Methods
  const resetSliderSizes = () => {
    sliderWidth.value = 0
    sliderHeight.value = 0
  }

  const moveToTab = (tab: TabComponent) => {
    const containerClientWidth = getClientWidth(container.value)
    const tabsClientWidth = getClientWidth(tabs.value)

    if (showPagination.value && tab.leftSidePosition.value + containerClientWidth <= tabsClientWidth) {
      tabsContentOffset.value = tab.leftSidePosition.value
    } else if (showPagination.value && tab.rightSidePosition.value >= containerClientWidth) {
      tabsContentOffset.value = tab.rightSidePosition.value - containerClientWidth
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

    tabsService.value?.tabs.forEach((tab: TabComponent) => {
      tab.updateSidePositions()

      if (tabSelected.value) {
        const { value: tabSelectedValue } = tabSelected.value
        const isSelectedTab = (tab.name || tab.id) === tabSelectedValue

        tab.isActive = tab.isActiveRouterLink || isSelectedTab

        if (tab.isActive) {
          moveToTab(tab)
          updateSlider(tab)
        }
      }
    })

    const containerClientWidth = getClientWidth(container.value)
    const tabsClientWidth = getClientWidth(tabs.value)

    if (tabsContentOffset.value + containerClientWidth > tabsClientWidth && tabsService.value) {
      moveToTab(tabsService.value.tabs[0])
    }

    updateStartingXPoint()
  }

  const updatePagination = () => {
    const tabsClientWidth = getClientWidth(tabs.value)
    const wrapperClientWidth = getClientWidth(wrapper.value)

    showPagination.value = false

    if (tabs.value && wrapper.value) {
      if (tabsClientWidth > wrapperClientWidth) {
        showPagination.value = true
      }
    }
  }

  const movePaginationLeft = () => {
    const containerClientWidth = getClientWidth(container.value)
    let offsetToSet = tabsContentOffset.value - containerClientWidth

    if (tabsService.value) {
      for (let i = 0; i < tabsService.value.tabs.length - 1; i++) {
        if (
          (tabsService.value.tabs[i].leftSidePosition > offsetToSet && tabsService.value.tabs[i].leftSidePosition < tabsContentOffset.value) ||
          tabsService.value.tabs[i + 1].leftSidePosition >= tabsContentOffset.value
        ) {
          offsetToSet = tabsService.value.tabs[i].leftSidePosition
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

    if (tabsService.value) {
      for (let i = 0; i < tabsService.value.tabs.length; i++) {
        if (tabsService.value.tabs[i].rightSidePosition > containerRightSide) {
          offsetToSet = tabsService.value.tabs[i].leftSidePosition
          if (tabsContentOffset.value < offsetToSet) {
            break
          }
        }
      }
    }

    const lastTab = tabsService.value?.tabs[tabsService.value.tabs.length - 1]
    const maxOffset = (lastTab?.rightSidePosition || 0) - containerClientWidth

    offsetToSet = Math.min(maxOffset, offsetToSet)
    tabsContentOffset.value = Math.max(0, offsetToSet)

    emit('click:next')
  }

  const updateSlider = (tab: TabComponent) => {
    // @ts-ignore
    const tabOffsetTop = tab.tabElement?.offsetTop || 0
    // @ts-ignore
    const tabOffsetLeft = tab.tabElement?.offsetLeft || 0
    // @ts-ignore
    const tabClientHeight = tab.tabElement?.clientHeight || 0
    // @ts-ignore0
    const tabClientWidth = tab.tabElement?.clientWidth || 0

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
      sliderHeight.value = null
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
    if (tab) {
      valueComputed.value = tab.name || tab.id

      if (props.stateful) {
        updateTabsState()
      }
    }
  }

  provide(TabsViewKey, {
    disabled: props.disabled,
    selectTab,
    moveToTab,
  })

  tabsService.value = useTabsService({
    parentDisabled: props.disabled,
    selectTab,
    moveToTab,
  })

  provide(TabsServiceKey, tabsService)

  // Lifecycle hooks
  watch(() => props.modelValue, () => {
    updateTabsState()
  })

  onMounted(() => {
    redrawTabs()

    requestAnimationFrame(() => {
      resizeObserver.value = new ResizeObserver(redrawTabs)
      wrapper.value && resizeObserver.value.observe(wrapper.value)
      tabs.value && resizeObserver.value.observe(tabs.value)
    })
  })

  onBeforeUnmount(() => {
    resizeObserver?.value?.disconnect()
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
}

export default useTabsView
