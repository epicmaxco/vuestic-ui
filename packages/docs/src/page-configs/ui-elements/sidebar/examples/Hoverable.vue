<template>
  <div style="height: 13rem; border: 2px solid var(--va-primary);">
    <va-sidebar hoverable textColor="dark" minimizedWidth="64px">
      <va-sidebar-item
        v-for="item in items"
        :key="item.to"
        :active="item.active"
      >
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
      items: [
        { title: 'Dashboard', icon: 'dashboard' },
        { title: 'Sidebar demo', icon: 'room', active: true },
        { title: 'Loop', icon: 'loop' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.va-sidebar {
  .va-sidebar__title {
    transition: opacity 0.2s ease-in-out;
  }

  &--minimized {
    .va-sidebar__title {
      opacity: 0;
    }
  }
}
</style>
