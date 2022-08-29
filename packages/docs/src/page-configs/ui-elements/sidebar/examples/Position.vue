<template>
  <div style="height: 13rem; border: 1px solid var(--va-secondary); position: relative;">
    <div class="content">Content</div>

    <va-sidebar
      v-model="enabled"
      :minimized="minimized"
      position="right"
      textColor="dark"
      style="position: absolute;"
    >
      <va-sidebar-item
        v-for="item in items"
        :key="item.title"
        :active="item.active"
      >
        <va-sidebar-item-content>
          <va-icon :name="item.icon" />
          <va-sidebar-item-title>
            {{ item.title }}
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
    </va-sidebar>
  </div>

  <va-checkbox class="mt-2" v-model="minimized" label="Minimized" />
  <va-checkbox class="mt-2" v-model="enabled" label="Show" />
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: 'Dashboard', icon: 'dashboard' },
        { title: 'Sidebar demo', icon: 'room', active: true },
        { title: 'Loop', icon: 'loop' },
      ],
      minimized: false,
      enabled: true,
    }
  },
}
</script>

<style lang="scss" scoped>
  .content {
    width: 100%;
    height: 100%;
    background-color: lightgrey;
  }
</style>
