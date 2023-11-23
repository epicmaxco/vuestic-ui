<template>
  <div class="h-52">
    <VaSidebar
      :minimized="minimized"
      width="11rem"
      minimized-width="64px"
    >
      <template
        v-for="item in items"
        :key="item.title"
      >
        <VaSidebarItem :active="item.active">
          <VaSidebarItemContent>
            <VaIcon :name="item.icon" />
            <VaSidebarItemTitle>
              {{ item.title }}
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
      </template>
    </VaSidebar>
  </div>

  <VaCheckbox
    v-model="minimized"
    class="mt-2"
    label="Minimized"
  />
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
    };
  },
};
</script>
