<template>
  <div
    class="demo-content"
    style="height: 13rem; border: 2px solid var(--va-primary)"
  >
    <va-sidebar v-model="enabled" textColor="dark">
      <va-sidebar-item
        v-for="item in items"
        :key="item.to"
        :active="item.active"
      >
        <va-sidebar-item-content>
          <va-icon :name="item.icon" />
          <va-sidebar-item-title style="height: 24px">
            {{ item.title }}
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
    </va-sidebar>
  </div>

  <div
    class="demo-controls px-2 py-2"
    style="background: var(--va-background); width: 100%"
  >
    <va-checkbox v-model="enabled" label="Shown" />
  </div>
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
