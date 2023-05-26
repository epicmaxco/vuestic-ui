<template>
  <div class="docs-layout" :key="isMounted + ''">
    <div v-if="!isMounted" class="docs-layout__loader" />
    <div
      ref="header"
      class="docs-layout__header"
    >
      <LayoutHeader
        v-model:isSidebarVisible="isSidebarVisible"
        v-model:isOptionsVisible="isOptionsVisible"
      />
    </div>
    <section
      v-show="!isOptionsVisible"
      class="docs-layout__main-section"
    >
      <aside class="docs-layout__sidebar">
        <LayoutSidebar
          v-model:visible="isSidebarVisible"
          :mobile="breakpoints.sm"
        />
      </aside>
      <main class="docs-layout__main-content">
        <article class="docs-layout__page-content va-typography-block">
          <slot />
        </article>
      </main>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useColors } from 'vuestic-ui'
import { useDocsScroll } from '../composables/useDocsScroll';
import { useIsMounted } from 'vuestic-ui/src/composables/useIsMounted'

const { currentPresetName } = useColors()
const breakpoints = useBreakpoint()

const isSidebarVisible = ref(!breakpoints.smDown)
const isOptionsVisible = ref(false)

watch(() => breakpoints.smDown, (newValue, oldValue) => {
  if (newValue && !oldValue) {
    isSidebarVisible.value = false
  }
  if (!newValue && oldValue) {
    isSidebarVisible.value = true
  }
  isOptionsVisible.value = false
})

const { afterEach } = useRouter()
const { scrollToElement } = useDocsScroll()
afterEach(() => {
  scrollToElement()
  isOptionsVisible.value = false

  if (breakpoints.smDown) {
    isSidebarVisible.value = false
  }
})

onMounted(scrollToElement)

useHead({
  link: [
    { href: 'https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css', rel: 'stylesheet' },
    { href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css', rel: 'stylesheet' },
    { href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css", rel: "stylesheet" },
  ],
  script: [
    { src: 'https://kit.fontawesome.com/5460c87b2a.js', crossorigin: 'anonymous' },
    { src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js', type: 'module' },
  ],
})

const isMounted = useIsMounted()
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

.docs-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: var(--va-font-family);

  &__loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999999;
    background: var(--va-background-primary);
  }

  &__header {
    width: 100%;
    background: var(--va-white);
    z-index: 99;
  }

  &__main-section {
    display: flex;
    flex-grow: 2;
    overflow: auto;
    position: relative;
  }

  &__sidebar {
    height: 100%;
    min-width: fit-content;
    overflow-y: auto;
    overflow-x: unset;

    @include va-scroll(var(--va-primary));
  }

  &__main-content {
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    justify-content: center;
    background: var(--va-background-primary);

    @include va-scroll(var(--va-primary));
  }

  &__page-content {
    width: 100%;
    max-width: 1080px;
    padding: 1.75rem 3.5rem;
    box-sizing: border-box;

    @include sm(padding, 2em);
  }
}
</style>
