<template>
  <VbDemo>
    <VbCard style="width: 100%;">
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
  </VbDemo>
</template>

<script>
import VaNavbar from './VaNavbar'
import VaIconMenuCollapsed from '../va-icon/va-iconset/VaIconMenuCollapsed.vue'
import VaNavbarItem from './VaNavbarItem/VaNavbarItem.vue'

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
    color:white;
  }
</style>
