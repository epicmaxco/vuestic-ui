<template>
  <va-sidebar
    class="sidebar"
    v-model="computedVisible"
    :width="sidebarWidth"
  >
    <LayoutDocsSidebarAlgoliaSearch />

    <va-accordion
      v-model="accordionValue"
      multiply
    >
      <va-collapse
        v-for="(route, key) in sidebarItems"
        :key="key"
      >
        <template #header="{ value, hasKeyboardFocus }">
          <div
            class="sidebar__collapse-custom-header"
            :class="{
              'sidebar__collapse-custom-header--active': isRouteHasActiveChild(route),
              'sidebar__collapse-custom-header--keyboard-focused': hasKeyboardFocus
            }"
          >
            {{ t(route.text) }}
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
            color="primary"
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
                {{ t(childRoute.text) }}
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

<script setup lang="ts">
import { useColors } from 'vuestic-ui';
import { createPageRoutes } from '~~/page-configs';
import { PageRoute } from '~~/types/page-config';
import { TranslationString } from '~~/types/translations';
import camelCase from 'lodash/camelCase.js'

type SidebarItem = PageRoute & { text: TranslationString, children: SidebarItem[], category?: string }

const { locale, t } = useI18n()
const pages = createPageRoutes()

const emit = defineEmits(['update:visible'])

const props = defineProps({
  visible: { type: Boolean },
  mobile: { type: Boolean },
})

const computedVisible = computed({
  get: () => props.visible,
  set: (val: boolean) => emit('update:visible', val)
})

const onSidebarItemClick = () => props.mobile && emit('update:visible', false)

const { getColor, getHoverColor, getFocusColor } = useColors()

const activeColor = computed(() => getFocusColor(getColor('primary')))
const hoverColor = computed(() => getHoverColor(getColor('primary')))
const badgeColors = { wip: 'primary', new: 'success' }

const sidebarWidth = computed(() => props.mobile ? '100%' : '16rem')

const createSidebarItems = (pages: PageRoute[]): SidebarItem[] => {
  const grouped = pages
    .map((page) => ({
      ...page,
      meta: page.meta || {} as PageRoute['meta'],
      text: page.meta?.displayName || `menu.${camelCase(page.name)}`,
      children: page.children && createSidebarItems(page.children),
    }))
    .reduce((result, item) => {
      const key = item.meta.category || '_noGroup'
      if (!result[key]) { result[key] = [] }
      result[key].push(item)
      return result
    }, {} as Record<string, SidebarItem[]>)

  return Object.keys(grouped)
    .reduce((result, group) => {
      if (group !== '_noGroup') {
        grouped[group][0].category = group
      }
      return result.concat(grouped[group])
    }, [])
}

const sidebarItems = computed(() => createSidebarItems(pages))
const { currentRoute, afterEach } = useRouter()

const isActiveChildRoute = (route: PageRoute, parent: PageRoute) => {
  const childPath = `/${locale.value}/${parent.name}/${route.name}`

  return currentRoute.value.path === childPath
}

const accordionValue = ref<boolean[]>([])

const isRouteHasActiveChild = (route: { path: string, children: { path: string }[] }) => {
  return !!route.children.some(({ path }) => currentRoute.value.path.includes(path))
}

const updateAccordionValue = () => {
  accordionValue.value = sidebarItems.value.map((route, index) => {
    if (!route.children || accordionValue.value[index]) {
      return accordionValue.value[index]
    }

    return isRouteHasActiveChild(route)
  })
}

afterEach(updateAccordionValue)
updateAccordionValue()
</script>

<style lang="scss">
@import "vuestic-ui/styles/resources";

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

    .va-sidebar__menu {
      @include va-scroll(var(--va-primary));
    }

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
