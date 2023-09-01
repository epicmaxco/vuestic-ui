<script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  import { useBreakpoint } from 'vuestic-ui'

  const breakpoints = useBreakpoint()

  const isSidebarVisible = ref(breakpoints.mdUp)

  watchEffect(() => {
    isSidebarVisible.value = breakpoints.smUp
  })

  const menu = [
    { icon: 'add', title: 'Add' },
    { icon: 'phone', title: 'Phone' },
    { icon: 'email', title: 'Email' },
    { icon: 'settings', title: 'Settings' },
    { icon: 'logout', title: 'Logout' },
  ]
</script>

<template>
  <VaLayout
    :top="{ fixed: true, order: 2 }"
    :left="{ fixed: true, absolute: breakpoints.smDown, order: 1, overlay: breakpoints.smDown && isSidebarVisible }"
    @left-overlay-click="isSidebarVisible = false"
  >
    <template #top>
      <VaNavbar shadowed>
        <template #left>
          <VaButton
            preset="secondary"
            :icon="isSidebarVisible ? 'menu_open' : 'menu'"
            @click="isSidebarVisible = !isSidebarVisible"
          />
        </template>
      </VaNavbar>
    </template>

    <template #left>
      <VaSidebar v-model="isSidebarVisible">
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

    <template #content>
      <main>
        <article>
          <slot />
        </article>
      </main>
    </template>
  </VaLayout>
</template>
