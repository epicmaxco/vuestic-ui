<template>
  <VaNavbar
    color="primary"
    class="mb-3"
  >
    <template #left>
      <VaNavbarItem class="logo">
        LOGO
      </VaNavbarItem>
    </template>
    <template #right>
      <VaNavbarItem class="hidden sm:block">
        Dashboard
      </VaNavbarItem>
      <VaNavbarItem class="hidden sm:block">
        Reports
      </VaNavbarItem>
      <VaNavbarItem class="hidden sm:block">
        Users
      </VaNavbarItem>
      <VaNavbarItem>
        <VaIcon
          name="mdi-magnify"
        />
      </VaNavbarItem>
      <VaNavbarItem>
        <VaIcon
          name="mdi-account-circle-outline"
        />
      </VaNavbarItem>
    </template>
  </VaNavbar>

  <VaNavbar
    color="warning"
    class="mb-3"
  >
    <template #left>
      <VaNavbarItem class="logo">
        LOGO
      </VaNavbarItem>
    </template>
    <template #right>
      <VaNavbarItem class="hidden sm:block">
        Dashboard
      </VaNavbarItem>
      <VaNavbarItem class="hidden sm:block">
        Reports
      </VaNavbarItem>
      <VaNavbarItem class="hidden sm:block">
        Users
      </VaNavbarItem>
      <VaNavbarItem>
        <VaIcon name="mdi-magnify" />
      </VaNavbarItem>
      <VaNavbarItem>
        <VaIcon name="mdi-account-circle-outline" />
      </VaNavbarItem>
    </template>
  </VaNavbar>

  <VaNavbar
    v-bind="darkNavbarColors"
    class="mb-3"
  >
    <template #left>
      <VaNavbarItem class="logo">
        LOGO
      </VaNavbarItem>
    </template>
    <template #right>
      <VaNavbarItem class="hidden sm:block">
        Dashboard
      </VaNavbarItem>
      <VaNavbarItem class="hidden sm:block">
        Reports
      </VaNavbarItem>
      <VaNavbarItem class="hidden sm:block">
        Users
      </VaNavbarItem>
      <VaNavbarItem>
        <VaIcon
          :color="darkNavbarColors.textColor"
          name="mdi-magnify"
        />
      </VaNavbarItem>
      <VaNavbarItem>
        <VaIcon
          :color="darkNavbarColors.textColor"
          name="mdi-account-circle-outline"
        />
      </VaNavbarItem>
    </template>
  </VaNavbar>
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
