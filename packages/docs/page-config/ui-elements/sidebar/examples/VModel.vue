<template>
  <div class="h-52">
    <VaSidebar v-model="enabled">
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

  <VaCheckbox
    v-model="enabled"
    class="mt-2"
    label="Shown"
  />
</template>

<script>
export default {
  data() {
    return {
      enabled: true,
      items: [
        { title: "Dashboard", icon: "dashboard" },
        { title: "Sidebar demo", icon: "room", active: true },
        { title: "Loop", icon: "loop" },
      ],
    };
  },
};
</script>
