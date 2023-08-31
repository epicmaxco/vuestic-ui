<template>
  <va-accordion
    v-model="accordionValue"
    multiple
  >
    <va-collapse
      v-for="(route, idx) in items"
      :key="idx"
      :class="{ expanded: accordionValue[idx] && route.children }"
    >
      <template #header>
        <va-sidebar-item
          :active="isRouteActive(route)"
          @click="setRouteActive(route)"
        >
          <va-sidebar-item-content>
            <va-sidebar-item-title>
              {{ route.displayName }}
            </va-sidebar-item-title>
            <va-icon
              v-if="route.children"
              :name="accordionValue[idx] ? 'expand_less' : 'expand_more'"
            />
          </va-sidebar-item-content>
        </va-sidebar-item>
      </template>
      <va-sidebar-item
        v-for="(child, index) in route.children"
        :key="index"
        :active="isRouteActive(child)"
        @click="setRouteActive(child)"
      >
        <va-sidebar-item-content>
          <va-sidebar-item-title>
            {{ child.displayName }}
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
    </va-collapse>
  </va-accordion>
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

<style lang="scss" scoped>
.expanded {
  background-color: var(--va-background-primary);
}
</style>
