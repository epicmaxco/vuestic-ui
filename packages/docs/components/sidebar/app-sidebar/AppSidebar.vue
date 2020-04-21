<template>
  <va-sidebar :minimized="minimized">
    <template slot="menu">
      <template v-for="(item, key) in items">
      <va-sidebar-link-group
          :key="key"
          :minimized="minimized"
          v-if="item.children"
          :title="$t(item.displayName)"
          :children="item.children"
        >
          <va-sidebar-link
            v-for="(subMenuItem, key) in item.children"
            :key="key"
            :to="subMenuItem.name"
            :title="$t(subMenuItem.displayName)"
      />
      </va-sidebar-link-group>
        <va-sidebar-link
          v-else
          :key="key"
          :minimized="minimized"
          :activeByDefault="item.name === route.name"
          :to="item.name"
        >
          <span slot="title">{{ $t(item.displayName) }}</span>
      </va-sidebar-link>
      </template>
    </template>
  </va-sidebar>
</template>

<script lang="ts">
//@ts-nocheck
import {Component, Vue } from 'vue-property-decorator';
import VaSidebar from "./va-sidebar/VaSidebar.vue";
import VaSidebarLink from "./va-sidebar/VaSidebarLink.vue";
import VaSidebarLinkGroup from './va-sidebar/VaSidebarLinkGroup.vue'
import {navigationRoutes} from "./NavigationRoutes";
@Component({
  components: {
    VaSidebarLinkGroup,
    VaSidebarLink,
    VaSidebar
  },
  props: {
    minimized: {
      type: Boolean,
      required: true
    }
  },
  name: 'app-sidebar'})
export default class AppSidebar extends Vue {
  data() {
    return {
      items: navigationRoutes.routes
    };
  }
  get route() {
      return this.$route || {}
    }
};
</script>
