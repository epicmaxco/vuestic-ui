<template>
  <va-accordion
    v-model="value"
    class="max-w-sm"
  >
    <va-collapse
      v-for="(group, idx) in items"
      :key="idx"
      :header="group.title"
    >
      <router-link
        v-for="(navItem, idx) in group.items"
        :key="idx"
        class="nav-item"
        :to="navItem.to"
      >
        {{ navItem.label }}
      </router-link>
    </va-collapse>
  </va-accordion>
</template>

<script>
export default {
  data() {
    return {
      value: [false, true, false, false],
      items: [
        {
          title: "UI Elements",
          items: [
            { label: "Button", to: "/ui-elements/button" },
            { label: "Data Table", to: "/ui-elements/table" },
            { label: "Radio", to: "/ui-elements/radio" },
          ],
        },
        {
          title: "Services",
          items: [
            { label: "Global Config", to: "/services/global-config" },
            { label: "Breakpoint Service", to: "/services/breakpoints" },
          ],
        },
        {
          title: "Styles",
          items: [
            { label: "Colors", to: "/styles/colors" },
            { label: "Typography", to: "/styles/typography" },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.nav-item {
  display: flex;
  flex-direction: column;
  padding: var(--va-collapse-padding);
  transition: all 0.2s ease-in;

  &:hover {
    background-color: var(--va-background-element);
  }
}
</style>
