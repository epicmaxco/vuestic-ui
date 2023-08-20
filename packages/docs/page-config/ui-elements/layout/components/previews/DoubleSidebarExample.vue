<script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  import { useBreakpoint } from 'vuestic-ui'

  const breakpoints = useBreakpoint()

  const isSidebarVisible = ref(false)

  watchEffect(() => {
    isSidebarVisible.value = breakpoints.smUp
  })

  const mainMenu = [
    'home',
    'settings',
    'notifications',
    'account_circle',
  ]

  const subMenu = [
    { icon: 'add', title: 'Add' },
    { icon: 'phone', title: 'Phone' },
    { icon: 'email', title: 'Email' },
    { icon: 'settings', title: 'Settings' },
    { icon: 'logout', title: 'Logout' },
  ]
</script>

<template>
  <VaLayout>
    <template #left>
      <VaSidebar
        width="min-content"
        color="primary"
        hover-color="secondary"
      >
        <VaSidebarItem
          v-for="icon in mainMenu"
          :key="icon"
        >
          <VaSidebarItemContent @click="isSidebarVisible = !isSidebarVisible">
            <VaIcon :name="icon" />
          </VaSidebarItemContent>
        </VaSidebarItem>
      </VaSidebar>
    </template>

    <VaLayout
      :left="{ absolute: breakpoints.smDown, order: 2 }"
    >
      <template #top>
        <div style="padding: 1rem">
          Top content
        </div>
        <va-divider style="margin: 0" />
      </template>

      <template #left>
        <div style="display: flex; height: 100%;">
          <VaSidebar v-model="isSidebarVisible">
            <VaSidebarItem
              v-for="{ icon, title } in subMenu"
              :key="icon"
            >
              <VaSidebarItemContent>
                <VaIcon :name="icon" />
                <VaSidebarItemTitle>
                  {{ title }}
                </VaSidebarItemTitle>
              </VaSidebarItemContent>
            </VaSidebarItem>
          </VaSidebar>
        </div>
      </template>

      <template #content>
        <main>
          <article>
            <slot />
          </article>
        </main>
      </template>
    </VaLayout>
  </VaLayout>
</template>
