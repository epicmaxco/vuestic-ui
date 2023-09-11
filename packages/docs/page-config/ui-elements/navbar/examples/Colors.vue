<template>
  <va-navbar
    color="primary"
    class="mb-3"
  >
    <template #left>
      <va-navbar-item class="logo">
        LOGO
      </va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item>Dashboard</va-navbar-item>
      <va-navbar-item class="hidden sm:block">Reports</va-navbar-item>
      <va-navbar-item>Users</va-navbar-item>
      <va-navbar-item>
        <va-icon
          name="mdi-magnify"
          color="textInverted"
        />
      </va-navbar-item>
      <va-navbar-item>
        <va-icon
          name="mdi-account-circle-outline"
          color="textInverted"
        />
      </va-navbar-item>
    </template>
  </va-navbar>

  <va-navbar
    color="warning"
    class="mb-3"
  >
    <template #left>
      <va-navbar-item class="logo">
        LOGO
      </va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item>Dashboard</va-navbar-item>
      <va-navbar-item class="hidden sm:block">Reports</va-navbar-item>
      <va-navbar-item>Users</va-navbar-item>
      <va-navbar-item>
        <va-icon name="mdi-magnify" />
      </va-navbar-item>
      <va-navbar-item>
        <va-icon name="mdi-account-circle-outline" />
      </va-navbar-item>
    </template>
  </va-navbar>

  <va-navbar
    v-bind="darkNavbarColors"
    class="mb-3"
  >
    <template #left>
      <va-navbar-item class="logo">
        LOGO
      </va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item>Dashboard</va-navbar-item>
      <va-navbar-item class="hidden sm:block">Reports</va-navbar-item>
      <va-navbar-item>Users</va-navbar-item>
      <va-navbar-item>
        <va-icon
          :color="darkNavbarColors.textColor"
          name="mdi-magnify"
        />
      </va-navbar-item>
      <va-navbar-item>
        <va-icon
          :color="darkNavbarColors.textColor"
          name="mdi-account-circle-outline"
        />
      </va-navbar-item>
    </template>
  </va-navbar>
</template>

<script setup>
import { computed } from "vue";
import { useColors } from "vuestic-ui";

const { currentPresetName } = useColors();

const darkNavbarColors = computed(() => {
  if (currentPresetName.value === "light") {
    return {
      color: "#111111",
      textColor: "#BAFFC5",
    };
  } else {
    return {
      color: "#FBCAF6",
      textColor: "#481269",
    };
  }
});
</script>

<style scoped>
.logo {
  font-weight: 600;
  font-size: 1.5rem;
}
</style>
