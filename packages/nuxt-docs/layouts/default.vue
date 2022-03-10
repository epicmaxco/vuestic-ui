<template>
  <div class="docs-layout">
    <LayoutDocsHeader class="docs-layout__header" v-model:isSidebarVisible="isSidebarVisible" />
    <section>
      <aside>
        
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
  const isSidebarVisible = ref(false)
</script>