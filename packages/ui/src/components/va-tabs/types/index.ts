import { ComputedRef, Ref } from 'vue'

export const TabsViewKey = Symbol('TabsView')
export const TabKey = Symbol('Tab')

export interface TabComponent {
  id: string | number | null,
  tabElement: Ref<HTMLElement | null>,
  name: ComputedRef<string | number | undefined>,
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

export interface TabsView {
  parentDisabled: boolean,
  tabsList: TabComponent[],
  selectTab: (tab: TabComponent) => void,
  moveToTab: (tab: TabComponent) => void,
  registerTab: (tab: TabComponent) => void,
  unregisterTab: (tab: TabComponent) => void,
}
