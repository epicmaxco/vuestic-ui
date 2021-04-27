<template>
  <div
    style="position: relative; height: 13rem; width: 100%; border: 2px solid black;"
    class="row"
  >
    <va-checkbox v-model="enabled" style="margin-left: 20rem;" label="Enabled" />
    <va-sidebar v-model="enabled" textColor="dark">
      <va-sidebar-item v-for="item in items" :key="item.to" :active="item.active">
        <va-sidebar-item-content>
          <va-icon :name="item.icon" />
          <va-sidebar-item-title style="height: 24px;">
            {{ item.title }}
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
    </va-sidebar>
  </div>
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
