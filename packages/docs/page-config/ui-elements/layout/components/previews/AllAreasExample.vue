<script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  import { useBreakpoint } from 'vuestic-ui'

  const breakpoints = useBreakpoint()

  const isLeftSidebarVisible = ref(breakpoints.smUp)
  const isRightSidebarVisible = ref(breakpoints.smUp)

  watchEffect(() => {
    isLeftSidebarVisible.value = breakpoints.smUp
    isRightSidebarVisible.value = breakpoints.smUp
  })

  watch(isLeftSidebarVisible, (newValue) => {
    if (breakpoints.smDown && newValue) {
      isRightSidebarVisible.value = false
    }
  })

  watch(isRightSidebarVisible, (newValue) => {
    if (breakpoints.smDown && newValue) {
      isLeftSidebarVisible.value = false
    }
  })

  const menu = [
    { icon: 'add', title: 'Add' },
    { icon: 'phone', title: 'Phone' },
    { icon: 'email', title: 'Email' },
    { icon: 'settings', title: 'Settings' },
    { icon: 'logout', title: 'Logout' },
  ]

  const subMenu = [
    { icon: 'home', title: 'Home' },
    { icon: 'settings', title: 'Settings' },
    { icon: 'notifications', title: 'Notifications' },
    { icon: 'account_circle', title: 'Account' },
  ]
</script>

<template>
  <VaLayout
    :top="{ fixed: true, order: 1 }"
    :left="{ absolute: breakpoints.smDown, order: 0, overlay: breakpoints.smDown && isSidebarVisible }"
    :right="{ absolute: breakpoints.smDown, order: 0, overlay: breakpoints.smDown && isSidebarVisible }"
    :bottom="{ fixed: true, order: 1 }"
    @left-overlay-click="isLeftSidebarVisible = false"
    @right-overlay-click="isRightSidebarVisible = false"
  >
    <template #top>
      <VaNavbar shadowed>
        <template #left>
          <VaButton
            preset="secondary"
            :icon="isLeftSidebarVisible ? 'menu_open' : 'menu'"
            @click="isLeftSidebarVisible = !isLeftSidebarVisible"
          />
        </template>
        <template #right>
          <VaButton
            preset="secondary"
            :icon="isRightSidebarVisible ? 'menu_open' : 'menu'"
            @click="isRightSidebarVisible = !isRightSidebarVisible"
          />
        </template>
      </VaNavbar>
    </template>

    <template #left>
      <VaSidebar v-model="isLeftSidebarVisible">
        <VaSidebarItem v-for="{ icon, title } in menu" :key="icon">
          <VaSidebarItemContent>
            <VaIcon :name="icon" />
            <VaSidebarItemTitle>
              {{ title }}
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
      </VaSidebar>
    </template>

    <template #right>
      <VaSidebar v-model="isRightSidebarVisible">
        <VaSidebarItem v-for="{ icon, title } in subMenu" :key="icon">
          <VaSidebarItemContent>
            <VaIcon :name="icon" />
            <VaSidebarItemTitle>
              {{ title }}
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
      </VaSidebar>
    </template>

    <template #content>
      <main>
        <article>
          <slot />
        </article>
      </main>
    </template>

    <template #bottom>
      <VaNavbar>
        Footer
      </VaNavbar>
    </template>
  </VaLayout>
</template>
