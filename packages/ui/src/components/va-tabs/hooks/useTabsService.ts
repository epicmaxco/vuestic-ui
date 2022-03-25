import { ref, Ref } from 'vue'
import { TabComponent } from './useTab'

export interface TabsService {
  tabs: Ref<TabComponent[]>,
  disabled: Ref<boolean | undefined>,
  register: (tab: TabComponent) => void,
  unregister: (tab: TabComponent) => void,
  tabClick: (tab: TabComponent) => void,
  tabFocus: (tab: TabComponent) => void,
  tabPressEnter: (tab: TabComponent) => void,
}

export interface TabsServiceProps {
  parentDisabled: boolean | undefined,
  selectTab: (tab: TabComponent) => void,
  moveToTab: (tab: TabComponent) => void,
}

export const useTabsService = ({ parentDisabled, selectTab, moveToTab }: TabsServiceProps): TabsService => {
  const tabs: Ref<TabComponent[]> = ref([])
  const disabled = ref(parentDisabled)

  const register = (tab: TabComponent) => {
    const idx = tabs.value.push(tab)

    tab.id = tab.name || idx
  }

  const unregister = (tab: TabComponent) => {
    tabs.value = tabs.value.filter((filteredTab: TabComponent) => filteredTab.id !== tab.id)

    tabs.value.forEach((tab: TabComponent, idx: number) => {
      tab.id = tab.name || idx
    })
  }

  const tabClick = (tab: TabComponent) => selectTab(tab)
  const tabFocus = (tab: TabComponent) => moveToTab(tab)
  const tabPressEnter = (tab: TabComponent) => selectTab(tab)

  return {
    tabs,
    disabled,
    register,
    unregister,
    tabClick,
    tabFocus,
    tabPressEnter,
  }
}
