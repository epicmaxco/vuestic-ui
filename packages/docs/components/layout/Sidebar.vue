<template>
  <VaSidebar
    v-model="writableVisible"
    class="sidebar docs-sidebar"
    :width="sidebarWidth"
    :animated="false"
  >
    <VaAccordion
      v-model="value"
      multiple
    >
      <VaCollapse
        v-for="(route, key) in navigationRoutes"
        :key="key"
      >
        <template #header="{ value: isCollapsed }">
          <VaSidebarItem
            class="sidebar__collapse-custom-header"
            :class="{
              'sidebar__collapse-custom-header--active': routeHasActiveChild(route),
            }"
            hover-opacity="0.07"
            border-color="transparent"
          >
            <VaBadge
              placement="right-center"
              size="small"
              offset="5px"
              :text="route.meta?.badge?.text"
              :color="route.meta && route.meta.badge && badgeColors[route.meta.badge.type]"
            >
              {{ route.displayName }}
            </VaBadge>
            <VaIcon :name="isCollapsed ? 'va-arrow-up' : 'va-arrow-down'" />
          </VaSidebarItem>
        </template>
        <template #body>
          <div
            v-for="(childRoute, index) in route.children"
            :key="index"
            class="va-sidebar__child"
          >
            <VaListLabel
              v-if="childRoute.category"
              class="va-sidebar__child__label"
              color="secondary"
            >
              {{ childRoute.category }}
            </VaListLabel>
            <VaSidebarItem
              :to="childRoute.path ? childRoute.path : `/${route.name}/${childRoute.name}`"
              :active="isActiveChildRoute(childRoute, route)"
              :hover-color="hoverColor"
              border-color="transparent"
              active-color="#ffffff00"
              hover-opacity="0.07"
              @click="onSidebarItemClick"
            >
              <VaSidebarItemContent>
                <VaSidebarItemTitle>
                  <VaBadge
                    placement="right-center"
                    size="small"
                    offset="5px"
                    :text="childRoute.meta?.badge?.text"
                    :color="childRoute.meta && childRoute.meta.badge && badgeColors[childRoute.meta.badge.type]"
                  >
                    {{ childRoute.displayName }}
                  </VaBadge>
                </VaSidebarItemTitle>
              </VaSidebarItemContent>
            </VaSidebarItem>
          </div>
        </template>
      </VaCollapse>
    </VaAccordion>
  </VaSidebar>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import { NavigationRoute, navigationRoutes } from '@/page-config/navigationRoutes'

export const getSortedNavigationRoutes = (routes: NavigationRoute[]): NavigationRoute[] => {
  // ToDO: normalize navigation routes with better structure. This sort is temporary solution
  const uiElementsIndex = routes.findIndex(route => route.name === 'ui-elements')
  const uiElements = routes.find(route => route.name === 'ui-elements')!.children!
  let result: NavigationRoute[] = []
  let nextCategoryIndex
  // Sort elements alphabetically
  do {
    let tempArr = []
    const tempCategoryName = uiElements[0].category
    delete uiElements[0].category
    nextCategoryIndex = uiElements.findIndex(element => element.category)
    if (nextCategoryIndex !== -1) {
      tempArr = uiElements.slice(0, nextCategoryIndex).sort((a, b) => a.name.localeCompare(b.name))
    } else {
      tempArr = uiElements.slice(0, uiElements.length).sort((a, b) => a.name.localeCompare(b.name))
    }
    tempArr[0].category = tempCategoryName
    result = [...result, ...tempArr]
    uiElements.splice(0, nextCategoryIndex)
  } while (uiElements.length && nextCategoryIndex !== -1)

  routes[uiElementsIndex].children = result
  return routes
}

export default defineComponent({
  name: 'DocsSidebar',
  props: {
    visible: { type: Boolean, default: false },
    mobile: { type: Boolean, default: false },
  },
  emits: ['update:visible'],
  setup: (props, { emit }) => {
    const route = useRoute()
    const { getColor, getFocusColor, getHoverColor } = useColors()

    const value = ref<boolean[]>([])
    const writableVisible = computed({
      get: () => props.visible,
      set: (v: boolean) => emit('update:visible', v),
    })

    const isActiveChildRoute = (child: NavigationRoute, parent: NavigationRoute) => {
      if (child.path) {
        return route.path === child.path
      }

      const path = `/${String(parent.name)}/${String(child.name)}`

      return path === route.path
    }

    const routeHasActiveChild = (section: NavigationRoute) =>
      section.children?.some(({ name }) => route.path.endsWith(`/${name}`))

    const setActiveExpand = () => {
      value.value = navigationRoutes.map((route, i) => {
        if (!route.children || value.value[i]) { return value.value[i] }

        return routeHasActiveChild(route) || false
      })
    }

    const sidebarWidth = computed(() => props.mobile ? '100dvw' : '16rem')

    const onSidebarItemClick = () => {
      if (props.mobile) {
        emit('update:visible', false)
      }
    }

    watch(() => route.fullPath, setActiveExpand, { immediate: true })

    return {
      navigationRoutes: getSortedNavigationRoutes(navigationRoutes),
      getColor,
      writableVisible,
      sidebarWidth,
      value,
      routeHasActiveChild,
      isActiveChildRoute,
      onSidebarItemClick,
      badgeColors: { wip: 'primary', new: 'danger', updated: 'warning' },
      activeColor: computed(() => getFocusColor(getColor('primary'))),
      hoverColor: computed(() => getHoverColor(getColor('primary'))),
    }
  },
})
</script>

<style lang="scss" scoped>
@import "vuestic-ui/src/styles/resources";
@import "@/assets/smart-grid.scss";

.sidebar {
  &__collapse-custom-header {
    position: relative;
    padding: 1rem 1.2rem;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 56px;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;
    font-weight: 600;

    &--active {
      color: var(--va-primary) !important;
    }
  }

  &.va-sidebar {
    z-index: 1;
    height: 100%;
    color: var(--va-dark, #323742);

    .va-sidebar-item {
      &--active {
        color: var(--va-primary) !important;
      }
    }

    .va-sidebar-item-title {
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
    }
  }

  .va-sidebar__child {
    &__label {
      padding-left: 2rem;
      text-align: left;
    }

    .va-sidebar-item-content {
      padding-left: 3rem;
      min-height: 52px;
    }

    &:first-child {
      .va-sidebar__child__label {
        padding-top: 0;
      }
    }
  }
}
</style>
