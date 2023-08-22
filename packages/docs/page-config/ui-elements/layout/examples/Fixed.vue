<script setup lang="ts">
  const showSidebar = ref(true)

  const menu = [
    { icon: 'add', title: 'Add' },
    { icon: 'phone', title: 'Phone' },
    { icon: 'email', title: 'Email' },
    { icon: 'settings', title: 'Settings' },
    { icon: 'logout', title: 'Logout' },
  ]
</script>

<template>
  <VaModal
    fullscreen
    stateful
    hide-default-actions
    style="--va-modal-padding: 0px"
    max-width="100%"
  >
    <template #anchor="{ toggle }">
      <VaButton @click="toggle">
        Show demo
      </VaButton>
    </template>

    <template #content>
      <VaLayout
        :left="{ fixed: true }"
        :top="{ fixed: true }"
      >
        <template #top>
          <VaNavbar
            class="py-2"
            shadowed
          >
            <template #left>
              <VaButton
                :icon="showSidebar ? 'menu_open' : 'menu'"
                @click="showSidebar = !showSidebar"
              />
            </template>
          </VaNavbar>
        </template>

        <template #left>
          <VaSidebar v-model="showSidebar">
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
          <main class="p-4">
            Some text here
          </main>
        </template>
      </VaLayout>
    </template>
  </VaModal>
</template>
