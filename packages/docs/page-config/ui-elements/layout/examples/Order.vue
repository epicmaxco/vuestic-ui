<script setup lang="ts">
  const showLeftSidebar = ref(true)
  const showRightSidebar = ref(true)
</script>

<template>
  <VaLayout 
    :left-order="1"
    :top-order="2"
    style="height: 500px"
  >
    <template #top>
      <VaNavbar color="primary">
        <template #left>
          <VaButton @click="showLeftSidebar = !showLeftSidebar" :icon="showLeftSidebar ? 'menu_open' : 'menu'" />
        </template>
        Hello!
        <template #right>
          <VaButton @click="showRightSidebar = !showRightSidebar" :icon="showRightSidebar ? 'menu_open' : 'menu'" />
        </template>
      </VaNavbar>
    </template>

    <template #left>
      <VaSidebar v-model="showLeftSidebar">
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

    <template #right>
      <VaSidebar v-model="showRightSidebar">
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

    <template #bottom>
      <VaNavbar color="primary">
        Footer
      </VaNavbar>
    </template>
  </VaLayout>
</template>