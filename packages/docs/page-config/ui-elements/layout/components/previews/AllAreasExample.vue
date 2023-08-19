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
</script>

<template>
  <VaLayout
    :top="{ fixed: true, order: 1 }"
    :left="{ absolute: breakpoints.smDown, order: 0 }"
    :right="{ absolute: breakpoints.smDown, order: 0 }"
    :bottom="{ fixed: true, order: 1 }"
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
      </VaSidebar>
    </template>

    <template #right>
      <VaSidebar v-model="isRightSidebarVisible">

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
