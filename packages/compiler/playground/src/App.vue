<script setup lang="ts">
// import VcButton from './components/VcButton.vue'
// import VcInput from './components/VcInput.vue'
// import VcList from './components/VcList.vue'
// import VcIcon from './components/VcIcon.vue'
</script>

<template>
  <div class="">
    <VcButton icon="person">
      Sign In <span class="text-red-500">!</span>
    </VcButton>

    <VcButton loading @click="() => console.log('clicked')">
      Test
    </VcButton>

    <VcInput placeholder="Enter your name" class="border-1-red" />

    <VcList :items="['List 1', 'List 2', 'List 3']"></VcList>

    <VcIcon icon="person" />

    <div class="text-red-500">Hello world!</div>
  </div>
</template>
