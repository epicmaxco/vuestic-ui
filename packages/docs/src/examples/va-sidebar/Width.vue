<template>
  <div
    class="demo-content"
    style="height: 13rem; border: 2px solid var(--va-primary);"
  >
    <va-sidebar
      :minimized="minimized"
      textColor="dark"
      width="11rem"
      minimizedWidth="64px"
    >
      <template v-for="item in items" :key="item.to">
        <va-sidebar-item :active="item.active">
          <va-sidebar-item-content>
            <va-icon :name="item.icon" />
            <va-sidebar-item-title v-if="!minimized" style="height: 24px;">
              {{ item.title }}
            </va-sidebar-item-title>
          </va-sidebar-item-content>
        </va-sidebar-item>
      </template>
    </va-sidebar>
  </div>

  <div
    class="demo-controls px-2 py-2"
    style="background: var(--va-secondary); width: 100%;"
  >
    <va-checkbox v-model="minimized" label="Minimized" />
  </div>
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
    }
  },
}
</script>
