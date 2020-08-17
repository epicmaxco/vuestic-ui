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
          <template v-for="category in item.childrenCategories">
            <span class="category py-3" :style="categoryTitleStyle" :key="category">{{$t(category)}}</span>
            <va-sidebar-link
              v-for="(subMenuItem, index) in item.children.filter(child => child.category === category)"
              :key="index"
              :to="subMenuItem.name"
              :title="$t(subMenuItem.displayName)"
              no-highlight
            />
          </template>
          <va-sidebar-link
            class="pl-3"
            v-for="(subMenuItem, index) in item.children.filter(({category}) => !category)"
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
import { Component, Vue, Prop } from 'vue-property-decorator'
import { NavigationRoute } from './NavigationRoutes'

@Component({})
export default class Sidebar extends Vue {
  @Prop({ type: Boolean, required: true }) readonly minimized!: boolean
  @Prop({ type: Array, default: [] }) readonly items!: NavigationRoute[]

  get categoryTitleStyle () {
    return {
      textTransform: 'uppercase',
      color: (this as any).$themes.gray,
      fontSize: '10px',
      fontWeight: 'bold',
      letterSpacing: '0.6px',
    }
  }

  get route () {
    return this.$route || {}
  }
}
</script>

<style lang="scss" scoped>
.category {
  padding-left: 2rem;
}
</style>
