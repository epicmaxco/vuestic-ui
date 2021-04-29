<template>
  <va-sidebar class="sidebar" v-model="visible">
    <algolia-search />

    <va-accordion v-model="value" multiply>
      <va-collapse
        v-for="(route, key) in navigationRoutes"
        :key="key"
      >
        <template #header>
          <va-sidebar-item>
            <va-sidebar-item-content :class="{ 'va-sidebar-item--active': isRouteHasActiveChild(route) }">
              <va-sidebar-item-title>
                {{ $t(route.displayName) }}
              </va-sidebar-item-title>
              <va-icon v-if="route.children" :name="value[key] ? 'expand_less' : 'expand_more'" />
            </va-sidebar-item-content>
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
              color="gray"
            >
              {{ $t(childRoute.category) }}
          </va-list-label>
          <va-sidebar-item
            :to="`/${$root.$i18n.locale}/${route.name}/${childRoute.name}`"
            :active="isActiveChildRoute(childRoute, route)"
            :hoverColor="getColor('secondary')"
            @click="onSidebarItemClick"
          >
            <va-sidebar-item-content>
              {{ $t(childRoute.displayName) }}
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
import { getColor } from 'vuestic-ui/src/main'

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

  onSidebarItemClick () {
    if (this.mobile) {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~vuestic-ui/src/components/vuestic-sass/resources/resources.scss";

.va-sidebar {
  z-index: 1;
  height: 100%;
  min-width: 16rem;
  color: var(--va-dark, #323742);

  &.va-sidebar--hidden {
    min-width: 0;
  }

  @include media-breakpoint-down(xs) {
    width: 100% !important;
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
    font-weight: bold;
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
</style>
