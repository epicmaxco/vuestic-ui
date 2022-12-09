<template>
  <VbDemo>
    <VbCard title="Default" style="width: 100%;">
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

    <VbCard title="Custom color" style="width: 100%;">
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
      <va-navbar color="textPrimary">
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
      <va-navbar color="backgroundPrimary">
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

    <VbCard title="Slots" style="width: 100%;">
      <va-navbar color="primary">
        <template #left>
          <va-icon-menu-collapsed :collapsed="isSidebarCollapsed" @click="isSidebarCollapsed = !isSidebarCollapsed" class="va-navbar__item" />
          <va-navbar-item>LONG LOGO</va-navbar-item>
        </template>
      </va-navbar>
      <va-navbar color="success">
        <va-navbar-item>Hello!</va-navbar-item>
        <va-navbar-item>Im in center</va-navbar-item>
        <va-navbar-item>NavbarItem</va-navbar-item>
      </va-navbar>
      <va-navbar color="warning">
        <va-navbar-item>Hello!</va-navbar-item>
        <va-navbar-item>Im in default slot</va-navbar-item>
        <va-navbar-item>NavbarItem</va-navbar-item>
      </va-navbar>
      <va-navbar color="info">
        <template #left>
          <va-icon-menu-collapsed :collapsed="isSidebarCollapsed" @click="isSidebarCollapsed = !isSidebarCollapsed" class="va-navbar__item" />
          <va-navbar-item>LONG LOGO</va-navbar-item>
        </template>
        <template #right>
          <va-navbar-item>Hello!</va-navbar-item>
          <va-navbar-item>Im right</va-navbar-item>
          <va-navbar-item>NavbarItem</va-navbar-item>
        </template>
      </va-navbar>
      <va-button-toggle
        v-model="currentSlot"
        :options="slotsList"
        class="mt-4 mb-4"
      />
      <va-navbar color="#990099">
        <template #[currentSlot]>
          <va-icon-menu-collapsed
            :collapsed="isSidebarCollapsed"
            @click="isSidebarCollapsed = !isSidebarCollapsed"
            class="va-navbar__item"
          />
          <va-navbar-item style="text-transform: capitalize;">
            {{ currentSlot }}
          </va-navbar-item>
        </template>

        <va-navbar-item>Hello!</va-navbar-item>
        <va-navbar-item>Im in default slot</va-navbar-item>
        <va-navbar-item>NavbarItem</va-navbar-item>
      </va-navbar>
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaButtonToggle } from '../index'
import { VaNavbar, VaNavbarItem } from './'
import VaIconMenuCollapsed from './demo/VaIconMenuCollapsed.vue'

const SLOTS_LIST = [
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
]

export default {
  components: {
    VaNavbar,
    VaNavbarItem,
    VaButtonToggle,
    VaIconMenuCollapsed,
  },
  data () {
    return {
      isSidebarCollapsed: true,
      slotsList: SLOTS_LIST,
      currentSlot: SLOTS_LIST[0].value,
    }
  },
}
</script>

<style lang="scss" scoped>
.va-navbar {
  color: white;
}
</style>
