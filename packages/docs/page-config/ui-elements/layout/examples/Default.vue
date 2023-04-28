<script setup lang="ts">
  const showSidebar = ref(false)
</script>

<template>
  <VaLayout style="height: 500px">
    <template #top>
      <VaNavbar color="primary">
        <template #left>
          <VaButton @click="showSidebar = !showSidebar" :icon="showSidebar ? 'menu_open' : 'menu'" />
        </template>
        Hello!
      </VaNavbar>
    </template>

    <template #left>
      <VaSidebar v-model="showSidebar">
        <VaSidebarItem>
          <VaSidebarItemContent>
            <VaIcon name="home" /> Home
          </VaSidebarItemContent>
        </VaSidebarItem>
        <VaSidebarItem>
          <VaSidebarItemContent>
            <VaIcon name="phone" /> About
          </VaSidebarItemContent>
        </VaSidebarItem>
      </VaSidebar>
    </template>

    <template #content>
      <div class="p-4">
        <h1>Content</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
      </div>
    </template>
  </VaLayout>
</template>