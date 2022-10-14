<template>
  <div class="mb-4" style="height: 16rem;">
    <va-sidebar color="primary" gradient minimizedWidth="64px" width="18rem">
      <va-sidebar-item
        v-for="item in items"
        :key="item.title"
        :active="item.active"
        active-color="backgroundPrimary"
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
    }
  },
}
</script>
