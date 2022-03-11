<template>
  <div class="docs-layout">
    <LayoutDocsHeader class="docs-layout__header" v-model:isSidebarVisible="isSidebarVisible" />
    <section class="d-flex">
      <aside>
        <LayoutDocsSidebar v-model:visible="isSidebarVisible"/>
      </aside>
      <main>
        <article>
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
</script>