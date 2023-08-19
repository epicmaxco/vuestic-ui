<script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  import { useBreakpoint } from 'vuestic-ui'

  const breakpoints = useBreakpoint()

  const isSidebarVisible = ref(breakpoints.smUp)

  watchEffect(() => {
    isSidebarVisible.value = breakpoints.smUp
  })
</script>

<template>
  <VaLayout
    :top="{ fixed: true, order: 1 }"
    :left="{ fixed: true, absolute: breakpoints.smDown, order: 0 }"
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
        <VaSidebarItem>
          <VaSidebarItemContent>
            <VaIcon name="home" />
            <VaSidebarItemTitle>
              Home
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
        <VaSidebarItem>
          <VaSidebarItemContent>
            <VaIcon name="phone" />
            <VaSidebarItemTitle>
              About
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
