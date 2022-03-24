import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  Ref,
  SetupContext, unref,
} from 'vue'
import { ClassComputed, ComputedStyle, TabsServiceKey } from '../types'
import useKeyboardOnlyFocus, { KeyboardFocusListeners } from '../../../composables/useKeyboardOnlyFocus'
import { useColor } from '../../../composables/useColor'
import { RouterLinkProps, useRouterLink } from '../../../composables/useRouterLink'
import { TabsService } from './useTabsService'

export interface TabProps {
  color: string,
  icon: string,
  label: string,
  disabled: boolean,
  name: string | number | undefined,
  tag: string,
}

export interface TabComponent {
  name: string | number | undefined,
  tabElement: Ref<HTMLElement | null>,
  id: string | number | null,
  isActive: Ref<boolean>,
  rightSidePosition: Ref<number>,
  leftSidePosition: Ref<number>,
  hoverState: Ref<boolean>,
  classComputed: Ref<ClassComputed>,
  computedStyle: Ref<ComputedStyle>,
  tabIndexComputed: Ref<number>,
  tabsService: Ref<TabsService | undefined>,
  hasKeyboardFocus: Ref<boolean>,
  keyboardFocusListeners: KeyboardFocusListeners,
  isActiveRouterLink: any,
  tagComputed: any,
  hrefComputed: any,
  updateSidePositions: () => void,
  onTabClick: () => void,
  onTabKeydown: () => void,
  onFocus: () => void,
  updateHoverState: (isHover: boolean) => void,
}

export const useTab = (props: TabProps & RouterLinkProps, { emit }: SetupContext): TabComponent => {
  const tabsService = inject(TabsServiceKey) as Ref<TabsService>
  const tabElement = ref<HTMLElement | null>(null)

  const id = ref<string | number | null>(null)
  const isActive = ref(false)
  const rightSidePosition = ref(0)
  const leftSidePosition = ref(0)
  const hoverState = ref(false)
  const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus()
  const { tagComputed, hrefComputed, isActiveRouterLink } = useRouterLink(props)
  const { colorComputed } = useColor(props)

  const classComputed = computed(() => ({ 'va-tab--disabled': props.disabled }))

  const computedStyle = computed(() => ({
    color: hasKeyboardFocus || hoverState || isActive ? colorComputed : 'inherit',
  }))

  const tabIndexComputed = computed(() => (props.disabled || tabsService.value.disabled) ? -1 : 0)

  const updateSidePositions = () => {
    const componentOffsetLeft = tabElement.value?.offsetLeft || 0
    const componentOffsetWidth = tabElement.value?.offsetWidth || 0

    rightSidePosition.value = componentOffsetLeft + componentOffsetWidth
    leftSidePosition.value = componentOffsetLeft
  }

  const onTabClick = () => {
    tabsService.value.tabClick(tabComponent)
    emit('click')
  }

  const onTabKeydown = () => {
    tabsService.value.tabPressEnter(tabComponent)
    emit('keydown-enter')
  }

  const onFocus = () => {
    if (hasKeyboardFocus.value) {
      tabsService.value.tabFocus(tabComponent)
    }

    emit('focus')
  }

  const updateHoverState = (isHover: boolean) => {
    hoverState.value = isHover
  }

  const tabComponent: TabComponent = {
    name: props.name,
    id: unref(id),
    tabElement,
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
    isActiveRouterLink,
    updateSidePositions,
    onTabClick,
    onTabKeydown,
    onFocus,
    updateHoverState,
  }

  onMounted(() => {
    tabsService.value.register(tabComponent)
  })

  onBeforeUnmount(() => {
    tabsService.value.unregister(tabComponent)
  })

  return tabComponent
}
