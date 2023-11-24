<template>
  <VaSidebarItem
    v-for="(route, idx) in items"
    :key="idx"
    :active="isRouteActive(route)"
    @click="setRouteActive(route)"
  >
    <VaSidebarItemContent>
      <VaSidebarItemTitle>
        {{ route.name }}
      </VaSidebarItemTitle>
    </VaSidebarItemContent>
  </VaSidebarItem>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      items: [{ name: "Home" }, { name: "Docs" }, { name: "Media" }],
      activeRouteName: "Docs",
    };
  },
  methods: {
    isRouteActive(route: { name: string }) {
      return this.activeRouteName === route.name;
    },
    setRouteActive(route: { name: string }) {
      this.activeRouteName = route.name;
    },
  },
});
</script>
