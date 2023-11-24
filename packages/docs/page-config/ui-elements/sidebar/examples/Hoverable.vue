<template>
  <div class="h-52">
    <VaSidebar
      hoverable
      minimized-width="64px"
    >
      <VaSidebarItem
        v-for="item in items"
        :key="item.title"
        :active="item.active"
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
