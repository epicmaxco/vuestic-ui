<template>
  <va-accordion
    v-model="value"
    style="max-width: 400px;"
  >
    <va-collapse
      v-for="(group, idx) in items"
      :key="idx"
      :header="group.title"
      text-color="textPrimary"
      color="textInverted"
      flat
    >
      <div style="padding: 0 1rem 0.75rem;">
        <router-link
          v-for="(navItem, idx) in group.items"
          :key="idx"
          class="nav-item"
          :to="navItem.to"
        >
          {{ navItem.label }}
        </router-link>
      </div>
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
.va-collapse + .va-collapse {
  border-top: 1px solid var(--va-background-element);
}

.nav-item {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  color: black !important;
  transition: all 0.2s ease-in;

  &:hover {
    background-color: #c0c0c0;
  }
}
</style>
