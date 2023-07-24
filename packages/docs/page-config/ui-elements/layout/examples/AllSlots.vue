<script setup lang="ts">
  const showLeftSidebar = ref(true)
  const showRightSidebar = ref(true)
</script>

<template>
  <VaLayout style="height: 500px">
    <template #top>
      <VaNavbar color="primary" class="py-2">
        #top
      </VaNavbar>
    </template>

    <template #left>
      <VaSidebar v-model="showLeftSidebar" class="p-4">
        #left
      </VaSidebar>
    </template>

    <template #content>
      <main class="p-4">
        #content
      </main>
    </template>

    <template #right>
      <VaSidebar v-model="showRightSidebar" class="p-4">
        #right
      </VaSidebar>
    </template>

    <template #bottom>
      <footer class="p-4 border-[var(--va-background-border)] border-t-2">
        #bottom
      </footer>
    </template>
  </VaLayout>
</template>