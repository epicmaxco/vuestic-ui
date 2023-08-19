<script setup lang="ts">
  const showLeftSidebar = ref(true)
  const showRightSidebar = ref(true)

  const orders = reactive({
    left: 2,
    top: 1,
    right: 2,
    bottom: 1,
  })

  const breakpoints = useBreakpoint()
</script>

<template>
  <div class="mb-4 flex gap-2 justify-between flex-wrap">
    <VaCounter v-model="orders.top" label="top" />
    <VaCounter v-model="orders.left" label="left" />
    <VaCounter v-model="orders.right" label="right" />
    <VaCounter v-model="orders.bottom" label="bottom" />
  </div>

  <VaLayout
    :left="{ order: orders.left }"
    :top="{ order: orders.top }"
    :right="{ order: orders.right }"
    :bottom="{ order: orders.bottom }"
  >
    <template #top>
      <VaNavbar color="primary" class="py-2 h-14">
        <template v-if="!showLeftSidebar" #left>
          <VaButton @click="showLeftSidebar = !showLeftSidebar" icon="menu" />
        </template>
        <template #center>
          <va-navbar-item class="font-bold text-lg">
            LOGO
          </va-navbar-item>
        </template>
        <template v-if="!showRightSidebar" #right>
          <VaButton @click="showRightSidebar = !showRightSidebar" icon="menu" />
        </template>
      </VaNavbar>
    </template>

    <template #left>
      <VaSidebar v-model="showLeftSidebar" :minimized="breakpoints.smDown">
        <div class="p-2">
          <VaButton preset="secondary" @click="showLeftSidebar = !showLeftSidebar" icon="menu_open" />
        </div>
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
      <main class="p-4">
        <h3 class="va-h3">Page content</h3>
        <p>Page content must be wrapped in main tag. You must do it manually. Here you can place any blocks you need in your application.</p>

        <p>For example, you can place here your router view, add sidebar with navigation in #left slot.</p>
        <p>If you're using VaSidebar for page navigation don't forget to wrap it in nav tag.</p>
      </main>
    </template>

    <template #right>
      <VaSidebar v-model="showRightSidebar" :minimized="breakpoints.smDown">
        <div class="p-2 text-right">
          <VaButton preset="secondary" @click="showRightSidebar = !showRightSidebar" icon="menu_open" />
        </div>
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

    <template #bottom>
      <footer class="p-4 border-[var(--va-background-border)] border-t-2 text-right">
        Footer
      </footer>
    </template>
  </VaLayout>
</template>
