<template>
  <va-sidebar class="sidebar" v-model="visible" :width="sidebarWidth">
    <algolia-search />

    <va-accordion v-model="value" multiply>
      <va-collapse
        v-for="(route, key) in navigationRoutes"
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
            {{ $t(route.displayName) }}
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
              {{ $t(childRoute.category) }}
          </va-list-label>
          <va-sidebar-item
            :to="`/${$root.$i18n.locale}/${route.name}/${childRoute.name}`"
            :active="isActiveChildRoute(childRoute, route)"
            :activeColor="activeColor"
            border-color="primary"
            @click="onSidebarItemClick"
          >
            <va-sidebar-item-content>
              <va-sidebar-item-title>
                {{ $t(childRoute.displayName) }}
              </va-sidebar-item-title>
              <div class="va-sidebar-item-badges" v-if="childRoute.meta && childRoute.meta.badge">
                <va-chip
                  size="small"
                  :color="badgeColors[childRoute.meta.badge]"
                  :title="$t(`menu.badges.${childRoute.meta.badge}.title`)"
                >
                  {{ $t(`menu.badges.${childRoute.meta.badge}.text`) }}
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
import { watch } from 'vue'
import { Options, Vue, prop } from 'vue-class-component'
import AlgoliaSearch from './algolia-search/AlgoliaSearch.vue'
import VaSidebarLink from './SidebarLink.vue'
import { getColor, useColors } from 'vuestic-ui/src/main'

class Props {
  navigationRoutes = prop<any[]>({ type: Array, default: () => [] })
  visible = prop<boolean>({ type: Boolean, default: false })
  mobile = prop<boolean>({ type: Boolean, default: false })
}

@Options({
  components: { AlgoliaSearch, VaSidebarLink },
})
export default class Sidebar extends Vue.with(Props) {
  value = [] as boolean[]

  created () {
    watch(() => (this as any).$route, this.onRouteChange, { immediate: true })
  }

  getColor (color: string) {
    return getColor(color)
  }

  badgeColors = { wip: 'primary', new: 'success' }

  get activeColor () {
    return '#b8c9ec'
  }

  onRouteChange () {
    this.setActiveExpand()
  }

  isActiveChildRoute (route: { name: string }, parent: { name: string }) {
    const vue = this as any
    const path = `/${vue.$root.$i18n.locale}/${parent.name}/${route.name}`
    return path === vue.$route.path
  }

  isRouteHasActiveChild (route: { name: string, children: {name: string}[] }) {
    const pathSteps: string[] = (this as any).$route.path.split('/').filter(Boolean)
    return !!route.children
      .some(({ name }: { name: string}) => pathSteps.includes(name))
  }

  setActiveExpand () {
    this.value = this.navigationRoutes.map((route, index) => {
      if (!route.children || this.value[index]) { return this.value[index] }

      return this.isRouteHasActiveChild(route)
    })
  }

  get sidebarWidth () {
    if (this.mobile) {
      return '100%'
    }

    return '16rem'
  }

  onSidebarItemClick () {
    if (this.mobile) {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~vuestic-ui/src/components/vuestic-sass/resources/resources.scss";

.sidebar {
  &__collapse-custom-header {
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
      background-color: rgba(184, 201, 236, 0.2);
    }

    &--active {
      color: var(--primary, #4591e3);
    }

    &--keyboard-focused {
      background-color: rgba(184, 201, 236, 0.2);
    }
  }

  .va-sidebar {
    z-index: 1;
    height: 100%;
    min-width: 16rem;
    color: var(--va-dark, #323742);

    &.va-sidebar--hidden {
      min-width: 0;
    }

    @include media-breakpoint-down(xs) {
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
      color: var(--primary, #4591e3);

      .va-sidebar-item-title {
        color: var(--primary, #4591e3);
      }
    }

    &__child {
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
}
</style>
