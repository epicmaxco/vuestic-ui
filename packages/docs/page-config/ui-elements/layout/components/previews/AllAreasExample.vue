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
    :bottom="{ fixed: true, order: 1 }"
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
        <VaSidebarItem v-for="i in 20" :key="i">
          <VaSidebarItemContent>
            <VaIcon name="home" />
            <VaSidebarItemTitle>
              Home
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
      </VaSidebar>
    </template>

    <template #right>
      <VaSidebar v-model="isSidebarVisible">

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
