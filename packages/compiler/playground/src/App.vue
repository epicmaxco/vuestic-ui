<script setup lang="ts">
import TestPage from './pages/TestPage.vue';
</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <VcButton icon="person" cool>
      Sign In <span class="text-red-100">!</span>
    </VcButton>

    <VcButton loading @click="() => console.log('clicked')">
      Test
    </VcButton>

    <VcInput placeholder="Enter your name" />

    <VaIcon name="person" />

    <span class="text-red-100">Hello world!</span>
  </div>
</template>
