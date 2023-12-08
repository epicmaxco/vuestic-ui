<template>
  <VaAccordion
    v-model="accordionValue"
    multiple
  >
    <VaCollapse
      v-for="(route, idx) in items"
      :key="idx"
      :class="{ expanded: accordionValue[idx] && route.children }"
    >
      <template #header>
        <VaSidebarItem
          :active="isRouteActive(route)"
          @click="setRouteActive(route)"
        >
          <VaSidebarItemContent>
            <VaSidebarItemTitle>
              {{ route.displayName }}
            </VaSidebarItemTitle>
            <VaIcon
              v-if="route.children"
              :name="accordionValue[idx] ? 'expand_less' : 'expand_more'"
            />
          </VaSidebarItemContent>
        </VaSidebarItem>
      </template>
      <template #body>
        <VaSidebarItem
          v-for="(child, index) in route.children"
          :key="index"
          :active="isRouteActive(child)"
          @click="setRouteActive(child)"
        >
          <VaSidebarItemContent>
            <VaSidebarItemTitle>
              {{ child.displayName }}
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
      </template>
    </VaCollapse>
  </VaAccordion>
</template>

<script lang="ts">
import { defineComponent } from "vue";

declare type DemoRoute = {
  name: string;
  displayName: string;
  children?: DemoRoute[];
};

export default defineComponent({
  data() {
    return {
      accordionValue: [false, false, true],
      items: [
        {
          name: "Home",
          displayName: "Home",
        },
        {
          name: "Docs",
          displayName: "Docs",
        },
        {
          name: "Components",
          displayName: "Components",
          children: [
            {
              name: "Button",
              displayName: "Button",
            },
            {
              name: "Input",
              displayName: "Input",
            },
          ],
        },
      ],
      // Change this with current route came from your router :)
      activeRouteName: "Docs",
    };
  },
  methods: {
    isRouteActive(route: DemoRoute) {
      return this.activeRouteName === route.name;
    },
    setRouteActive(route: DemoRoute) {
      if (route.children) {
        return;
      }
      this.activeRouteName = route.name;
    },
  },
});
</script>

<style>
.expanded {
  background-color: var(--va-background-primary);
}
</style>
