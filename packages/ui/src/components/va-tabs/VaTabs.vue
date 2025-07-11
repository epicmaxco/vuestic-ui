<template>
  <div
    class="va-tabs"
    :class="computedTabsClass"
  >
    <div
      ref="wrapper"
      class="va-tabs__wrapper"
      role="tablist"
      :aria-disabled="$props.disabled"
    >
      <va-button
        v-if="showPagination && !$props.hidePagination"
        class="va-tabs__pagination"
        :aria-label="tp($props.ariaMoveLeftLabel)"
        size="medium"
        :disabled="disablePaginationLeft"
        :color="color"
        preset="secondary"
        :icon="$props.prevIcon"
        @click="movePaginationLeft"
      />
      <div
        ref="container"
        class="va-tabs__container"
        :class="computedClass"
      >
        <div
          ref="tabs"
          class="va-tabs__tabs"
          :style="paginationControlledStyles"
        >
          <div
            class="va-tabs__slider-wrapper"
            aria-hidden="true"
            :style="sliderStyles"
          >
            <div class="va-tabs__slider" />
          </div>

          <va-config :components="tabConfig">
            <div class="va-tabs__tabs-items">
              <slot name="tabs" />
            </div>
          </va-config>
        </div>
      </div>
      <va-button
        v-if="showPagination && !$props.hidePagination"
        class="va-tabs__pagination"
        :aria-label="tp($props.ariaMoveRightLabel)"
        size="medium"
        :color="color"
        :disabled="disablePaginationRight"
        preset="secondary"
        :icon="$props.nextIcon"
        @click="movePaginationRight"
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
  provide,
  reactive,
  ref,
  unref,
  watch,
  Ref,
  shallowRef,
  StyleValue,
  WritableComputedRef,
  onMounted,
  watchEffect,
  ShallowRef,
  PropType,
} from 'vue'

import {
  useComponentPresetProp,
  useStateful, useStatefulProps,
  useColors,
  useResizeObserver,
  useTranslation, useTranslationProp,
  ColorName,
} from '../../composables'
import { StringWithAutocomplete } from '../../utils/types/prop-type'

import { TabsViewKey, TabComponent, TabSelected } from './types'

import { VaButton } from '../va-button'
import { VaConfig } from '../va-config'

const getClientWidth = (element: HTMLElement | null | undefined): number => element?.clientWidth || 0
</script>

<script lang="ts" setup>
const { tp } = useTranslation()

defineOptions({
  name: 'VaTabs',
})

const props = defineProps({
  ...useStatefulProps,
  ...useComponentPresetProp,
  modelValue: { type: [String, Number], default: null },
  left: { type: Boolean, default: true },
  right: { type: Boolean, default: false },
  center: { type: Boolean, default: false },
  grow: { type: Boolean, default: false },
  hidePagination: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  hideSlider: { type: Boolean, default: false },
  vertical: { type: Boolean, default: false },
  color: { type: String as PropType<StringWithAutocomplete<ColorName>>, default: 'primary' },
  prevIcon: { type: String, default: 'va-arrow-left' },
  nextIcon: { type: String, default: 'va-arrow-right' },
  ariaMoveRightLabel: useTranslationProp('$t:movePaginationLeft'),
  ariaMoveLeftLabel: useTranslationProp('$t:movePaginationRight'),
})

const emit = defineEmits(['update:modelValue', 'click:next', 'click:prev'])

const wrapper = shallowRef<HTMLElement>()
const container = shallowRef<HTMLElement>()
const tabs = shallowRef<HTMLElement>()

const tabsList: ShallowRef<TabComponent[]> = shallowRef([])
const sliderHeight = ref<number | null>(null)
const sliderWidth = ref<number | null>(null)
const sliderOffsetX = ref(0)
const sliderOffsetY = ref(0)
const showPagination = ref(false)
const tabsContentOffset = ref(0)
const startingXPoint = ref(0)
const animationIncluded = ref(false)
const tabSelected: WritableComputedRef<TabSelected> = useStateful(props, emit)

const tabConfig = reactive({
  VaTab: {
    color: props.color,
  },
})

const computedClass = computed(() => {
  const { left, right, center, grow, disabled } = props

  return {
    'va-tabs__container--left': left && !right && !center && !grow,
    'va-tabs__container--right': right,
    'va-tabs__container--center': center,
    'va-tabs__container--grow': grow,
    'va-tabs__container--disabled': disabled,
  }
})

const computedTabsClass = computed(() => ({ 'va-tabs--vertical': props.vertical }))

const { getColor } = useColors()
const colorComputed = computed(() => getColor(props.color))

const sliderStyles = computed<StyleValue>(() => {
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

const paginationControlledStyles = computed<StyleValue>(() => {
  // Prevents the movement of vertical tabs
  if (props.vertical) {
    return {
      transform: 'translateX(0px)',
    }
  }

  return {
    transform: `translateX(${startingXPoint.value - tabsContentOffset.value}px)`,
    transition: animationIncluded.value ? 'var(--va-tabs-slider-transition)' : '',
    position: props.hidePagination ? 'unset' : 'absolute',
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
  const leftSidePosition = unref(tab.leftSidePosition)
  const rightSidePosition = unref(tab.rightSidePosition)

  // tabsContainer must be at the beginning of container
  if (!showPagination.value) {
    tabsContentOffset.value = 0
    return
  }

  // tab is completely placed in the container - no need to move tabsContainer
  if (
    (leftSidePosition - tabsContentOffset.value >= 0) &&
    (rightSidePosition - tabsContentOffset.value <= containerClientWidth)
  ) {
    return
  }

  // tab does not fit at the beginning of the container -
  // move tabsContainer so that the beginning of the tab is at the beginning of the container
  if (leftSidePosition - tabsContentOffset.value < 0) {
    tabsContentOffset.value = leftSidePosition
    return
  }

  // tab does not fit at the end of the container -
  // move tabsContainer so that the end of the tab is at the end of the container
  if (rightSidePosition - tabsContentOffset.value > containerClientWidth) {
    tabsContentOffset.value = rightSidePosition - containerClientWidth
    return
  }

  tabsContentOffset.value = 0
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

  tabsList.value.forEach((tab) => {
    tab.updateSidePositions()

    const isTabSelected = (tab.name?.value || tab.id) === tabSelected.value
    const isTabActive = tab.isActiveRouterLink.value || isTabSelected

    // If tab changed, move to new tab
    if (isTabActive && !tab.isActive.value) {
      tab.isActive.value = true
      moveToTab(tab)
    } else {
      tab.isActive.value = isTabActive
    }
    if (tab.isActive.value) {
      updateSlider(tab)
    }
  })

  updateStartingXPoint()
}

watchEffect(() => {
  updateTabsState()
})

const updatePagination = () => {
  const tabsClientWidth = getClientWidth(tabs.value)
  const wrapperClientWidth = getClientWidth(wrapper.value)

  // we use requestAnimationFrame to prevent error "ResizeObserver loop limit exceeded"
  requestAnimationFrame(() => {
    showPagination.value = !!(tabs.value && wrapper.value && tabsClientWidth > wrapperClientWidth)
  })
}

const movePaginationLeft = () => {
  const containerClientWidth = getClientWidth(container.value)
  let offsetToSet = tabsContentOffset.value - containerClientWidth

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

  tabsContentOffset.value = Math.max(0, offsetToSet)

  emit('click:prev')
}

const movePaginationRight = () => {
  const containerClientWidth = getClientWidth(container.value)
  const containerRightSide = tabsContentOffset.value + containerClientWidth
  let offsetToSet = containerRightSide

  for (let i = 0; i < tabsList.value.length - 1; i++) {
    const rightSidePosition = unref(tabsList.value[i].rightSidePosition)

    if (rightSidePosition > containerRightSide) {
      offsetToSet = unref(tabsList.value[i].leftSidePosition)

      if (tabsContentOffset.value < offsetToSet) {
        break
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

watch(() => props.modelValue, updateTabsState)

useResizeObserver(wrapper, updatePagination)
useResizeObserver(container, updateTabsState)

onMounted(() => {
  requestAnimationFrame(() => {
    includeAnimation()
  })
})

defineExpose({
  selectTab,
  moveToTab,
  movePaginationLeft,
  movePaginationRight,
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import 'variables';

.va-tabs {
  display: var(--va-tabs-display);
  align-items: var(--va-tabs-align-items-horizontal);
  flex-direction: column;
  position: relative;
  font-family: var(--va-font-family);

  &__wrapper {
    overflow: hidden;
    contain: content;
    display: flex;
    flex: 1 1 auto;
    width: 100%;
  }

  .va-tabs__pagination {
    flex: 0 0 auto;
  }

  .va-tabs__container {
    overflow: hidden;
    flex: 1 1 auto;
    display: flex;
    height: var(--va-tabs-container-height);
    margin: var(--va-tabs-container-margin);
    white-space: nowrap;
    position: relative;

    .va-tabs__tabs {
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

      .va-tabs__tabs-items {
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
    align-items: var(--va-tabs-align-items-vertical);
    flex-direction: row;

    .va-tabs__wrapper {
      flex: 0 0 auto;
      width: unset;
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
    position: absolute;
    z-index: var(--va-tabs-slider-wrapper-z-index);

    .va-tabs__slider {
      width: var(--va-tabs-slider-width);
      height: var(--va-tabs-slider-height);
    }
  }

  .va-button {
    @include keyboard-focus-outline($offset: -2px);
  }
}
</style>
