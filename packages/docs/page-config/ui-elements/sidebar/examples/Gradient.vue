<template>
  <div
    class="mb-6 h-64"
  >
    <VaSidebar
      color="primary"
      gradient
      minimized-width="64px"
      width="18rem"
    >
      <VaSidebarItem
        v-for="item in items"
        :key="item.title"
        :active="item.active"
        active-color="backgroundPrimary"
      >
        <VaSidebarItemContent>
          <VaIcon :name="item.icon" />
          <VaSidebarItemTitle>
            {{ item.title }}
          </VaSidebarItemTitle>
        </VaSidebarItemContent>
      </VaSidebarItem>
    </VaSidebar>
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
    };
  },
};
</script>
