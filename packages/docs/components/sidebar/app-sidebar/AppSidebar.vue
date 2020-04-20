<template>
  <va-sidebar :minimized="minimized">
    <template slot="menu">
      <template v-for="(item, key) in items">
      <va-sidebar-link-group
          :key="key"
          :minimized="minimized"
          v-if="item.children"
          :title="item.displayName"
          :children="item.children"
        >
          <va-sidebar-link
            v-for="(subMenuItem, key) in item.children"
            :key="key"
            :to="subMenuItem.name"
            :title="subMenuItem.displayName"
      />
      </va-sidebar-link-group>
        <va-sidebar-link
          v-else
          :key="key"
          :minimized="minimized"
          :activeByDefault="item.name === route.name"
          :to="item.name"
        >
          <span slot="title">{{ item.displayName }}</span>
      </va-sidebar-link>
      </template>
    </template>
  </va-sidebar>
</template>

<script lang="ts">
//@ts-nocheck
import Vue from "Vue";
import VaSidebar from "./va-sidebar/VaSidebar.vue";
import VaSidebarLink from "./va-sidebar/VaSidebarLink.vue";
import VaSidebarLinkGroup from './va-sidebar/VaSidebarLinkGroup.vue'
import {navigationRoutes} from "./NavigationRoutes";

export default Vue.extend({
  name: "app-sidebar",
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
  data() {
    return {
      items: navigationRoutes.routes
    };
  },
  computed: {
    route() {
      return this.$route || {}
    }
  }
});
</script>
