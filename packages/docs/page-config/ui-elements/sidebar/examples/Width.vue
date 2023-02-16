<template>
  <div style="height: 13rem;">
    <va-sidebar
      :minimized="minimized"
      width="11rem"
      minimized-width="64px"
    >
      <template
        v-for="item in items"
        :key="item.title"
      >
        <va-sidebar-item :active="item.active">
          <va-sidebar-item-content>
            <va-icon :name="item.icon" />
            <va-sidebar-item-title>
              {{ item.title }}
            </va-sidebar-item-title>
          </va-sidebar-item-content>
        </va-sidebar-item>
      </template>
    </va-sidebar>
  </div>

  <va-checkbox
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
