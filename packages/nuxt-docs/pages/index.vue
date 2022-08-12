<template>
  <PageConfig v-if="config" :page-config="config" />
  <div v-else>Loading</div>
</template>

<script setup lang="ts">
const config = usePageConfig('button')
</script>