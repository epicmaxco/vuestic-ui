<template>
  <VbDemo>
    <VbCard title="Sidebar">
      <va-sidebar
        style="position: static; height: auto;"
        :minimized="minimized"
      >
        <template slot="menu">
          <template v-for="(item, index) in items">
            <sidebar-link-group
              :key="index"
              :icon="[ 'sidebar-menu-item-icon vuestic-iconset', item.meta.iconClass ]"
              v-if="item.children">
              <span slot="title">{{ item.displayName }}</span>
              <sidebar-link
                v-for="(subMenuItem, index) in item.children"
                :key="index"
                :to="{ name: subMenuItem.name }"
              >
                <div slot="title">
                  <span>{{ subMenuItem.displayName }}</span>
                </div>
              </sidebar-link>
            </sidebar-link-group>

            <sidebar-link
              v-else
              :key="index"
              :icon="[ 'sidebar-menu-item-icon vuestic-iconset', item.meta.iconClass ]"
              :to="{ name: item.name }">
              <span slot="title">{{ item.displayName }}</span>
            </sidebar-link>
          </template>
        </template>
      </va-sidebar>
    </VbCard>

    <VbCard title="Sidebar minimised">
      <va-sidebar
        style="position: static; height: auto;"
        minimized
      >
        <template slot="menu">
          <template v-for="(item, index) in items">
            <sidebar-link-group
              :key="index"
              :icon="[ 'sidebar-menu-item-icon vuestic-iconset', item.meta.iconClass ]"
              v-if="item.children"
              minimized
            >
              <span slot="title">{{ item.displayName }}</span>
              <sidebar-link
                v-for="(subMenuItem, index) in item.children"
                :key="index"
                :to="{ name: subMenuItem.name }"
                minimized
              >
                <div slot="title">
                  <span>{{ subMenuItem.displayName }}</span>
                </div>
              </sidebar-link>
            </sidebar-link-group>

            <sidebar-link
              v-else
              :key="index"
              :icon="[ 'sidebar-menu-item-icon vuestic-iconset', item.meta.iconClass ]"
              :to="{ name: item.name }"
              minimized
            >
              <span slot="title">{{ item.displayName }}</span>
            </sidebar-link>
          </template>
        </template>
      </va-sidebar>
    </VbCard>

    <VbCard title="Theme Switcher">
      <va-button-toggle
        outline
        small
        color="gray"
        v-model="mode"
        :options="modeOptions"
        style="max-width: 100%;"
      />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaSidebar from '../../vuestic-components/va-sidebar/VaSidebar'
import VaButtonToggle from '../../vuestic-components/va-button-toggle/VaButtonToggle'
import SidebarLinkGroup from './VaSidebarLinkGroup'
import SidebarLink from './VaSidebarLink'
import { navigationRoutes } from './navigation-router-example'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'

export default {
  mixins: [ColorThemeMixin],
  components: {
    VaSidebar,
    VaButtonToggle,
    SidebarLinkGroup,
    SidebarLink,
  },
  data () {
    return {
      value: 60,
      icon: 'iconicstroke iconicstroke-info',
      mode: 'original',
      theme: 'info',
      items: navigationRoutes.routes,
      hoverState: false,
      minimized: false,
    }
  },
  computed: {
    modeOptions () {
      return [{
        value: 'original',
        label: 'Original',
      }, {
        value: 'corporate',
        label: 'Corporate',
      }]
    },
  },
  watch: {
    mode (value) {
      this.setTheme(value)
    },
  },
}
</script>
