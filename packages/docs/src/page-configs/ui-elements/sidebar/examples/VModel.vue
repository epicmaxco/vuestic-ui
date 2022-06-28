<template>
  <div style="height: 13rem; border: 1px solid var(--va-secondary);">
    <va-sidebar v-model="enabled" textColor="dark">
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

  <va-checkbox class="mt-2" v-model="enabled" label="Shown" />
</template>

<script>
export default {
  data () {
    return {
      enabled: true,
      items: [
        { title: 'Dashboard', icon: 'dashboard' },
        { title: 'Sidebar demo', icon: 'room', active: true },
        { title: 'Loop', icon: 'loop' },
      ],
    }
  },
}
</script>
