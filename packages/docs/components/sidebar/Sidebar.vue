<template>
  <va-sidebar :minimized="minimized" color="secondary">
    <template slot="menu">
      <template v-for="(item, key) in items">
        <va-sidebar-link-group
          v-if="item.children"
          :key="key"
          :minimized="minimized"
          :title="$t(item.displayName)"
          :children="item.children"
          show-children-count
          no-highlight
        >
          <va-sidebar-link
            v-for="(subMenuItem, index) in item.children"
            :key="index"
            :to="subMenuItem.name"
            :title="$t(subMenuItem.displayName)"
            no-highlight
          />
        </va-sidebar-link-group>
        <va-sidebar-link
          v-else
          :key="key"
          :minimized="minimized"
          :active-by-default="item.name === route.name"
          :to="item.name"
          no-highlight
        >
          <span slot="title">{{ $t(item.displayName) }}</span>
        </va-sidebar-link>
      </template>
    </template>
  </va-sidebar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { navigationRoutes } from './NavigationRoutes'
@Component({
  props: {
    minimized: {
      type: Boolean,
      required: true,
    },
  },
})
export default class Sidebar extends Vue {
  data () {
    return {
      items: navigationRoutes.routes,
    }
  }

  get route () {
    return this.$route || {}
  }
}
</script>
