<template>
  <div
    :key="doShowLoader + ''"
  >
    <div
      v-show="doShowLoader"
      class="docs-layout__loader"
    />
    <VaLayout
      :top="{ fixed: true, order: 2 }"
      :left="{ fixed: true, absolute: breakpoints.smDown, overlay: breakpoints.smDown && isSidebarVisible, order: 1 }"
      class="docs-layout docs-layout--play"
      @left-overlay-click="isSidebarVisible = false"
    >
      <template #top>
        <LayoutHeader
          v-model:isSidebarVisible="isSidebarVisible"
          v-model:isOptionsVisible="isOptionsVisible"
        />
      </template>

      <template #left>
        <LayoutSidebar
          v-model:visible="isSidebarVisible"
          :mobile="breakpoints.xs"
        />
      </template>

      <template #content>
        <main class="docs-layout__main-content h-full">
          <article class="docs-layout__page-content !p-0 !max-w-full h-full">
            <slot />
          </article>
        </main>
      </template>
    </VaLayout>
  </div>
</template>

<script setup lang="ts">
const breakpoints = useBreakpoint()

const isSidebarVisible = ref(false)
const isOptionsVisible = ref(false)

watch(() => breakpoints.smDown, (newValue: boolean) => {
  isSidebarVisible.value = !newValue
  isOptionsVisible.value = false
})

const { afterEach } = useRouter()
const { scrollToElement } = useDocsScroll()
afterEach(() => {
  scrollToElement()
  isSidebarVisible.value = !breakpoints.smDown
  isOptionsVisible.value = false
})

onMounted(() => {
  scrollToElement()
  isSidebarVisible.value = !breakpoints.smDown
})

useHead({
  link: [
    { href: 'https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css', rel: 'stylesheet' },
    { href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css', rel: 'stylesheet' },
    { href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css", rel: "stylesheet" },
  ],
  script: [
    { src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js', type: 'module' },
  ],
})

const doShowLoader = ref(true)

onMounted(() => {
  setTimeout(() => {
    doShowLoader.value = false
  }, 300)
})
</script>

<style lang="scss">
@import 'vuestic-ui/styles/resources';
@import '@/assets/fonts-imports.scss';
@import '@/assets/smart-grid.scss';
// Need to import tailwind in layout, because otherwise Vuestic component's css will has a higher priority
// @import '~/assets/css/tailwind.css';

html {
  font-family: var(--va-font-family);
  color: var(--va-text-primary);
  background: var(--va-background-primary);
}

.docs-layout--play.docs-layout {
  font-family: var(--va-font-family);
  min-height: 100vh;

  &__loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999999;
    background: var(--va-background-primary);
  }

  &__main-section {
    display: flex;
    flex-grow: 2;
    overflow: auto;
    position: relative;
  }

  &__main-content {
    width: 100%;
    display: flex;
    justify-content: center;
    background: var(--va-background-primary);
  }

  &__page-content {
    width: 100%;
    max-width: 100% !important;
    box-sizing: border-box;
    padding: 0 !important;
  }
}
</style>
