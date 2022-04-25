<template>
  <div class="docs-layout">
    <div class="docs-layout__header" ref="header">
      <LayoutDocsHeader v-model:isSidebarVisible="isSidebarVisible" />
    </div>
    <section class="docs-layout__main-section">
      <aside class="docs-layout__sidebar">
        <LayoutDocsSidebar v-model:visible="isSidebarVisible" :mobile="sm"   />
      </aside>
      <main class="docs-layout__main-content">
        <article class="docs-layout__page-content layout">
          <VaContent>
            <slot />
          </VaContent>
        </article>
      </main>
    </section>
  </div>
</template>

<script setup lang="ts">
const isSidebarVisible = ref(true)

const { sm } = useBreakpoint()

watch(sm, (newValue, oldValue) => {
  if (newValue && !oldValue) {
    isSidebarVisible.value = false
  }
})

const { afterEach } = useRouter()
const { scrollToElement } = useDocsScroll()
afterEach(scrollToElement)
onMounted(scrollToElement)
</script>

<style lang="scss">
  @import 'vuestic-ui/styles/vuestic-styles.scss';

  html {
    font-family: var(--va-font-family);
  }

  .docs-layout {
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    font-family: var(--va-font-family);

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
      // height: 100%;
      overflow-y: scroll;
      overflow-x: hidden;

      @include va-scroll(var(--va-primary));
    }

    &__page-content {
      width: 100%;
      max-width: 1080px;
      padding: 1.75rem 3.5rem;
      box-sizing: border-box;
    }
  }
</style>
