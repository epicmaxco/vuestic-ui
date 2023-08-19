<script setup lang="ts">
  const showSidebar = ref(true)
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
            color="primary"
            class="py-2"
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
            <div
              v-for="i in 12"
              :key="i"
              class="px-2 py-1"
            >
              <VaSkeleton
                color="#0000000e"
                style="height: 40px;"
              />
            </div>
          </VaSidebar>
        </template>

        <template #content>
          <main class="p-4">
            <VaSkeleton
              variant="text"
              class="va-h1"
              lines="1"
            />
            <VaSkeleton
              v-for="i in 12"
              :key="i"
              variant="text"
              :lines="Math.floor(Math.random() * 10)"
              :last-line-width="Math.floor(Math.random() * 100) + '%'"
              class="mb-4"
            />
          </main>
        </template>
      </VaLayout>
    </template>
  </VaModal>
</template>
