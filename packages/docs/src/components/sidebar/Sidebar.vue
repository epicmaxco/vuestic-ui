<template>
  <va-sidebar
    class="sidebar"
    v-model="writableVisible"
    :width="sidebarWidth"
  >
    <va-accordion
      v-model="value"
      multiple
    >
      <va-collapse
        v-for="(route, key) in navigationRoutes"
        :key="key"
      >
        <template #header="{ value, hasKeyboardFocus }">
          <va-sidebar-item
            class="sidebar__collapse-custom-header"
            :class="{
              'sidebar__collapse-custom-header--active': routeHasActiveChild(route),
              'sidebar__collapse-custom-header--keyboard-focused': hasKeyboardFocus
            }"
          >
            {{ t(route.displayName) }}
            <va-icon :name="value ? 'expand_less' : 'expand_more'" />
          </va-sidebar-item>
        </template>
        <div
          v-for="(childRoute, index) in route.children"
          :key="index"
          class="va-sidebar__child"
        >
          <va-list-label
            v-if="childRoute.category"
            class="va-sidebar__child__label"
            color="secondary"
          >
            {{ t(childRoute.category) }}
          </va-list-label>
          <va-sidebar-item
            :to="`/${locale}/${route.name}/${childRoute.name}`"
            :active="isActiveChildRoute(childRoute, route)"
            :activeColor="activeColor"
            :hover-color="hoverColor"
            border-color="primary"
            @click="onSidebarItemClick"
          >
            <va-sidebar-item-content>
              <va-sidebar-item-title>
                <va-badge
                  class="sidebar-item-badge"
                  size="small"
                  :text="childRoute.meta && t(`menu.badges.${childRoute.meta.badge}.text`)"
                  :color="childRoute.meta && badgeColors[childRoute.meta.badge]"
                  :visible-empty="false"
                >
                  {{ t(childRoute.displayName) }}
                </va-badge>
              </va-sidebar-item-title>
            </va-sidebar-item-content>
          </va-sidebar-item>
        </div>
      </va-collapse>
    </va-accordion>
  </va-sidebar>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed, PropType } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useColors } from 'vuestic-ui/src/main'

import { NavigationRoute } from './navigationRoutes'

export default defineComponent({
  name: 'DocsSidebar',
  props: {
    navigationRoutes: { type: Array as PropType<NavigationRoute[]>, default: () => [] },
    visible: { type: Boolean, default: false },
    mobile: { type: Boolean, default: false },
  },
  setup: (props, { emit }) => {
    const i18n = useI18n()
    const route = useRoute()
    const { getColor, getFocusColor, getHoverColor } = useColors()

    const value = ref<boolean[]>([])
    const writableVisible = computed({
      get: () => props.visible,
      set: (v: boolean) => emit('update:visible', v),
    })

    const isActiveChildRoute = (child: NavigationRoute, parent: NavigationRoute) => {
      const path = `/${i18n.locale.value}/${String(parent.name)}/${String(child.name)}`

      return path === route.path
    }

    const routeHasActiveChild = (section: NavigationRoute) =>
      section.children?.some(({ name }) => route.path.endsWith(`/${name}`))

    const setActiveExpand = () => {
      value.value = props.navigationRoutes.map((route, i) => {
        if (!route.children || value.value[i]) { return value.value[i] }

        return routeHasActiveChild(route) || false
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
      badgeColors: { wip: 'primary', new: 'danger', updated: 'warning' },
      activeColor: computed(() => getFocusColor(getColor('primary'))),
      hoverColor: computed(() => getHoverColor(getColor('primary'))),

    }
  },
})
</script>

<style lang="scss">
@import "~vuestic-ui/src/styles/resources";
@import "~@/assets/main.scss";

.sidebar {
  &-item-badge {
    .va-badge__text-wrapper {
      transform: translate(5px, 2px);
    }
  }

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
    color: var(--va-dark, #323742);

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

  // two safari mobile panels, 44px each, can be both bottom
  @include md(padding-bottom, 5.5rem);
}
</style>
