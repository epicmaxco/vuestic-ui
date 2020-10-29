<template>
  <VbDemo>
    <VbCard title="Sidebar">
      <va-sidebar
        style="position: static; height: auto;"
        :minimized="minimized"
      >
        <template slot="menu">
          <template v-for="item in items">
            <sidebar-link-group
              :icon="[ 'sidebar-menu-item-icon vuestic-iconset', item.meta.iconClass ]"
              v-if="item.children"
              :key="item.name"
            >
              <span slot="title">{{ item.displayName }}</span>
              <sidebar-link
                v-for="(subMenuItem) in item.children"
                :key="subMenuItem.name"
                :to="{ name: subMenuItem.name }"
              >
                <div slot="title">
                  <span>{{ subMenuItem.displayName }}</span>
                </div>
              </sidebar-link>
            </sidebar-link-group>

            <sidebar-link
              v-else
              :icon="[ 'sidebar-menu-item-icon vuestic-iconset', item.meta.iconClass ]"
              :to="{ name: item.name }"
              :key="item.name"
            >
              <span slot="title">{{ item.displayName }}</span>
            </sidebar-link>
          </template>
        </template>
      </va-sidebar>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaSidebar from '../../vuestic-components/va-sidebar/VaSidebar'
import SidebarLinkGroup from './VaSidebarLinkGroup'
import SidebarLink from './VaSidebarLink'
import { navigationRoutes } from './navigation-router-example'

export default {
  components: {
    VaSidebar,
    SidebarLinkGroup,
    SidebarLink,
  },
  data () {
    return {
      value: 60,
      icon: 'info_outline',
      theme: 'info',
      items: navigationRoutes.routes,
      hoverState: false,
      minimized: false,
    }
  },
}
</script>
