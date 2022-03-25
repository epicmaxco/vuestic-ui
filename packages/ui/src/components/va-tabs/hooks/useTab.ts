import {
  computed, ComputedRef,
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

export interface TabComponent {
  id: string | number,
  tabElement: HTMLElement | null,
  name: string,
  tabIndexComputed: ComputedRef<number>,
  isActive: Ref<boolean>,
  isActiveRouterLink: ComputedRef<boolean>,
  rightSidePosition: Ref<number>,
  leftSidePosition: Ref<number>,
  onTabClick: () => void,
  onTabKeydown: () => void,
  onFocus: () => void,
  updateSidePositions: () => void,
}

export const useTab = (props: any, { emit }: SetupContext): TabComponent => {
  const { id, name, hasKeyboardFocus, disabled, isActiveRouterLink, tabElement } = props
  const isActive = ref(false)
  const tabsService = inject(TabsServiceKey) as Ref<TabsService>
  const rightSidePosition = ref(0)
  const leftSidePosition = ref(0)
  const tabIndexComputed = computed(() => (disabled || tabsService.value.disabled) ? -1 : 0)

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

  const updateSidePositions = () => {
    const componentOffsetLeft = tabElement?.value?.offsetLeft || 0
    const componentOffsetWidth = tabElement?.value?.offsetWidth || 0

    rightSidePosition.value = componentOffsetLeft + componentOffsetWidth
    leftSidePosition.value = componentOffsetLeft
  }

  const tabComponent: TabComponent = {
    id: unref(id),
    tabElement,
    name,
    isActive,
    tabIndexComputed,
    isActiveRouterLink,
    rightSidePosition,
    leftSidePosition,
    onTabClick,
    onTabKeydown,
    onFocus,
    updateSidePositions,
  }

  onMounted(() => {
    tabsService.value.register(tabComponent)
  })

  onBeforeUnmount(() => {
    tabsService.value.unregister(tabComponent)
  })

  return tabComponent
}
