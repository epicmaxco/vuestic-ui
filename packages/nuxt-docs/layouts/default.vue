<template>
  <div class="docs-layout">
    <div class="docs-layout__header" ref="header">
      <LayoutDocsHeader v-model:isSidebarVisible="isSidebarVisible" />
    </div>
    <section class="docs-layout__main-section">
      <aside>
        <LayoutDocsSidebar v-model:visible="isSidebarVisible" :mobile="sm"   />
      </aside>
      <main class="docs-layout__main-content">
        <article class="docs-layout__page-content">
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
</script>

<style lang="scss">
  .docs-layout {
    min-height: 100vh;
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
      flex: 1;
      position: relative;
    }

    &__main-content {
      display: flex;
      width: 100%;
      justify-content: center;
      overflow-y: scroll;
      overflow-x: hidden;
    }

    &__page-content {
      width: 100%;
      max-width: 1080px;
      padding: 1.75rem 3rem;
    }
  }
</style>