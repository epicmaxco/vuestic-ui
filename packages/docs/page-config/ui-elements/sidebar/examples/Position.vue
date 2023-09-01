<template>
  <div class="relative h-52">
    <div class="content">
      Content
    </div>

    <va-sidebar
      v-model="enabled"
      :minimized="minimized"
      class="absolute right-0 left-auto"
      animated="right"
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

  <div class="mt-2 space-x-2">
    <va-checkbox
      v-model="minimized"
      label="Minimized"
    />
    <va-checkbox
      v-model="enabled"
      label="Show"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "dashboard" },
        { title: "Sidebar demo", icon: "room", active: true },
        { title: "Loop", icon: "loop" },
      ],
      minimized: false,
      enabled: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  background-color: var(--va-background-primary);
}
</style>
