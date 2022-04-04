<template>
  <va-sidebar
    class="sidebar"
    v-model="writableVisible"
    :width="sidebarWidth"
  >
    <algolia-search />

    <va-accordion
      v-model="value"
      multiply
    >
      <va-collapse
        v-for="(route, key) in navigationRoutes"
        :key="key"
      >
        <template #header="{ value, hasKeyboardFocus }">
          <div
            class="sidebar__collapse-custom-header"
            :class="{
              'sidebar__collapse-custom-header--active': routeHasActiveChild(route),
              'sidebar__collapse-custom-header--keyboard-focused': hasKeyboardFocus
            }"
          >
            {{ t(route.displayName) }}
            <va-icon :name="value ? 'expand_less' : 'expand_more'" />
          </div>
        </template>
        <div
          v-for="(childRoute, index) in route.children"
          :key="index"
          class="va-sidebar__child"
        >
          <va-list-label
            v-if="childRoute.category"
            class="va-sidebar__child__label"
            color="gray"
          >
            {{ t(childRoute.category) }}
          </va-list-label>
          <va-sidebar-item
            :to="`/${locale}/${route.name}/${childRoute.name}`"
            :active="isActiveChildRoute(childRoute, route)"
            :activeColor="activeColor"
            :hover-color="hoverColor"
            border-color="primary"
            text-color="dark"
            @click="onSidebarItemClick"
          >
            <va-sidebar-item-content>
              <va-sidebar-item-title>
                {{ t(childRoute.displayName) }}
              </va-sidebar-item-title>
              <div
                class="va-sidebar-item-badges"
                v-if="childRoute.meta && childRoute.meta.badge"
              >
                <va-chip
                  size="small"
                  :color="badgeColors[childRoute.meta.badge]"
                  :title="t(`menu.badges.${childRoute.meta.badge}.title`)"
                >
                  {{ t(`menu.badges.${childRoute.meta.badge}.text`) }}
                </va-chip>
              </div>
            </va-sidebar-item-content>
          </va-sidebar-item>
        </div>
      </va-collapse>
    </va-accordion>
  </va-sidebar>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed, PropType } from 'vue'
import { useRoute, RouteRecord } from 'vue-router'
import { useI18n } from 'vue-i18n'

import AlgoliaSearch from './algolia-search/AlgoliaSearch.vue'
import { useColors } from 'vuestic-ui/src/main'

import { NavigationRoute } from './NavigationRoute'

export default defineComponent({
  name: 'DocsSidebar',
  components: { AlgoliaSearch },
  props: {
    navigationRoutes: { type: Array as PropType<NavigationRoute[]>, default: () => [] },
    visible: { type: Boolean, default: false },
    mobile: { type: Boolean, default: false },
  },
  setup: (props, { emit }) => {
    const { getColor, getFocusColor, getHoverColor } = useColors()
    const route = useRoute()

    const value = ref<boolean[]>([])
    const writableVisible = computed({
      get: () => props.visible,
      set: (v: boolean) => emit('update:visible', v),
    })

    const i18n = useI18n()
    const isActiveChildRoute = (route: NavigationRoute, parent: NavigationRoute) => {
      const path = `/${i18n.locale}/${String(parent.name)}/${String(route.name)}`

      return path === route.path
    }

    const routeHasActiveChild = (route: NavigationRoute) => {
      const pathSteps = route.path?.split('/').filter(Boolean)

      return !!route.children?.some(({ name }) => pathSteps?.includes(String(name)))
    }

    const setActiveExpand = () => {
      value.value = props.navigationRoutes.map((route, i) => {
        if (!route.children || value.value[i]) { return value.value[i] }

        return routeHasActiveChild(route)
      })
    }

    const sidebarWidth = computed(() => props.mobile ? '100%' : '16rem')

    const onSidebarItemClick = () => {
      if (props.mobile) {
        emit('update:visible', false)
      }
    }

    watch(() => route, setActiveExpand, { immediate: true })

    return {
      ...i18n,
      route,
      getColor,
      writableVisible,
      sidebarWidth,
      value,
      routeHasActiveChild,
      isActiveChildRoute,
      onSidebarItemClick,
      badgeColors: { wip: 'primary', new: 'success' },
      activeColor: computed(() => getFocusColor(getColor('primary'))),
      hoverColor: computed(() => getHoverColor(getColor('primary'))),

    }
  },
})
</script>

<style lang="scss">
@import "~vuestic-ui/src/styles/resources";

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

    ::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--va-primary);
      opacity: 0;
    }

    &:hover {
      ::before {
        opacity: 0.2;
      }
    }

    &--keyboard-focused {
      ::before {
        opacity: 0.3;
      }
    }

    &--active {
      color: var(--va-primary);
    }
  }

  &.va-sidebar {
    z-index: 1;
    height: 100%;
    min-width: 16rem;
    color: var(--va-dark, #323742);

    &.va-sidebar--hidden {
      min-width: 0;
    }

    @include media-breakpoint-down(sm) {
      z-index: 100;
      position: absolute;
    }

    .va-sidebar-item-content {
      cursor: pointer;
    }

    .va-sidebar-item {
      cursor: pointer;
    }

    .va-sidebar-item-title {
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
    }

    .va-sidebar-item--active {
      color: var(--va-dark, #323742) !important;

      .va-sidebar-item-title {
        color: var(--va-dark, #323742) !important;
      }
    }
  }

  .va-sidebar__child {
    &__label {
      padding-left: 2rem;
      text-align: left;
    }

    .va-sidebar-item-content {
      padding-left: 3rem;
    }

    &:first-child {
      .va-sidebar__child__label {
        padding-top: 0;
      }
    }
  }
}
</style>
