<script setup lang="ts">
import TestPage from './pages/TestPage.vue';
</script>

<template>
  <VaNavbar>
    <template #left>
      Vuestic UI Devtools demo
    </template>
    <template #right>
      <VaNavbarItem>
        <router-link to="/about">
          Test
        </router-link>

      </VaNavbarItem>
      <VaNavbarItem>
        <router-link to="/contact">Contact</router-link>
      </VaNavbarItem>
    </template>
  </VaNavbar>

  <div style="padding: 16px">
    <TestPage>
      Default slot
      <template #footer>
        Footer slot
      </template>
    </TestPage>
  </div>
</template>
