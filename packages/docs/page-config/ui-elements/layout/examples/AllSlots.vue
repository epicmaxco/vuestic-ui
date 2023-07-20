<script setup lang="ts">
  const showLeftSidebar = ref(true)
  const showRightSidebar = ref(true)
</script>

<template>
  <VaLayout style="height: 500px">
    <template #top>
      <VaNavbar color="primary" class="py-2">
        <template #left>
          <VaButton @click="showLeftSidebar = !showLeftSidebar" :icon="showLeftSidebar ? 'menu_open' : 'menu'" />
        </template>
        <h4>LOGO</h4>
        <template #right>
          <VaButton @click="showRightSidebar = !showRightSidebar" :icon="showRightSidebar ? 'menu_open' : 'menu'" />
        </template>
      </VaNavbar>
    </template>

    <template #left>
      <VaSidebar v-model="showLeftSidebar">
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
        <VaSidebarItem>
          <VaSidebarItemContent>
            <VaIcon name="bolt" />
            <VaSidebarItemTitle>
              Features
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
        <VaSidebarItem>
          <VaSidebarItemContent>
            <VaIcon name="arrow_upward" />
            <VaSidebarItemTitle>
              Scroll back
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
      </VaSidebar>
    </template>

    <template #content>
      <main class="p-4">
        <h3>Page content</h3>
        <p>Page content must be wrapped in main tag. You must do it manually. Here you can place any blocks you need in your application.</p>

        <p>For example, you can place here your router view, add sidebar with navigation in #left slot.</p>
        <p>If you're using VaSidebar for page navigation don't forget to wrap it in nav tag.</p>
      </main>
    </template>

    <template #right>
      <VaSidebar v-model="showRightSidebar">
        <VaSidebarItem>
          <VaSidebarItemContent>
            <VaIcon name="favorite" /> 
            <VaSidebarItemTitle>
              Favorite components
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
        <VaSidebarItem>
          <VaSidebarItemContent>
            <VaIcon name="grade" />
            <VaSidebarItemTitle>
              Best practices
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
      </VaSidebar>
    </template>

    <template #bottom>
      <footer class="p-4 border-[var(--va-background-border)] border-t-2 text-right">
        Footer
      </footer>
    </template>
  </VaLayout>
</template>