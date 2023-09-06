<template>
  <VaLayout style="height: 500px">
    <template #top>
      <VaNavbar color="primary" class="py-2">
        #top
      </VaNavbar>
    </template>

    <template #left>
      <div class="p-4 h-full bg-[var(--va-background-element)]">
        #left
      </div>
    </template>

    <template #content>
      <main class="p-4">
        #content
      </main>
    </template>

    <template #right>
      <div class="p-4 h-full bg-[var(--va-background-element)]">
        #right
      </div>
    </template>

    <template #bottom>
      <footer class="p-4 border-[var(--va-background-border)] border-t-2">
        #bottom
      </footer>
    </template>
  </VaLayout>
</template>
