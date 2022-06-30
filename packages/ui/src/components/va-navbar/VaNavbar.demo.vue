<template>
  <VbDemo>
    <VbCard style="width: 100%;" title="default">
      <va-navbar>
        <template #left>
          <va-icon-menu-collapsed :collapsed="isSidebarCollapsed" @click="isSidebarCollapsed = !isSidebarCollapsed" class="va-navbar__item" />
          <va-navbar-item>LONG LOGO</va-navbar-item>
        </template>
        <template #center>
          <va-navbar-item>Hello!</va-navbar-item>
          <va-navbar-item>Im in center</va-navbar-item>
          <va-navbar-item>NavbarItem</va-navbar-item>
        </template>
        <template #right>
          <va-navbar-item>Hello!</va-navbar-item>
          <va-navbar-item>Im right</va-navbar-item>
          <va-navbar-item>NavbarItem</va-navbar-item>
        </template>
      </va-navbar>
    </VbCard>

    <VbCard style="width: 100%;" title="Custom color">
      <va-navbar color="primary">
        <template #left>
          <va-icon-menu-collapsed :collapsed="isSidebarCollapsed" @click="isSidebarCollapsed = !isSidebarCollapsed" class="va-navbar__item" />
          <va-navbar-item>LONG LOGO</va-navbar-item>
        </template>
        <template #center>
          <va-navbar-item>Hello!</va-navbar-item>
        </template>
        <template #right>
          <va-navbar-item>Hello!</va-navbar-item>
        </template>
      </va-navbar>
      <va-navbar color="dark">
        <template #left>
          <va-icon-menu-collapsed :collapsed="isSidebarCollapsed" @click="isSidebarCollapsed = !isSidebarCollapsed" class="va-navbar__item" />
          <va-navbar-item>LONG LOGO</va-navbar-item>
        </template>
        <template #center>
          <va-navbar-item>Hello!</va-navbar-item>
        </template>
        <template #right>
          <va-navbar-item>Hello!</va-navbar-item>
        </template>
      </va-navbar>
      <va-navbar color="#ff00ff">
        <template #left>
          <va-icon-menu-collapsed :collapsed="isSidebarCollapsed" @click="isSidebarCollapsed = !isSidebarCollapsed" class="va-navbar__item" />
          <va-navbar-item>LONG LOGO</va-navbar-item>
        </template>
        <template #center>
          <va-navbar-item>Hello!</va-navbar-item>
        </template>
        <template #right>
          <va-navbar-item>Hello!</va-navbar-item>
        </template>
      </va-navbar>
      <va-navbar color="white">
        <template #left>
          <va-icon-menu-collapsed :collapsed="isSidebarCollapsed" @click="isSidebarCollapsed = !isSidebarCollapsed" class="va-navbar__item" />
          <va-navbar-item>LONG LOGO</va-navbar-item>
        </template>
        <template #center>
          <va-navbar-item>Hello!</va-navbar-item>
        </template>
        <template #right>
          <va-navbar-item>Hello!</va-navbar-item>
        </template>
      </va-navbar>
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaNavbar, VaNavbarItem } from './'
import VaIconMenuCollapsed from './demo/VaIconMenuCollapsed.vue'

export default {
  components: {
    VaNavbar, VaIconMenuCollapsed, VaNavbarItem,
  },
  data () {
    return {
      isSidebarCollapsed: true,
    }
  },
}
</script>

<style lang="scss" scoped>
  .va-navbar {
    color: white;
  }
</style>
