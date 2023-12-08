<template>
  <div class="relative h-52">
    <div class="content">
      Content
    </div>

    <VaSidebar
      v-model="enabled"
      :minimized="minimized"
      class="absolute right-0 left-auto"
      animated="right"
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

  <div class="mt-2 space-x-2">
    <VaCheckbox
      v-model="minimized"
      label="Minimized"
    />
    <VaCheckbox
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

<style>
.content {
  width: 100%;
  height: 100%;
  background-color: var(--va-background-primary);
}
</style>
