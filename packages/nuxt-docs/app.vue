<template>
  <div>
    <PageConfig v-if="config" :pageConfig="config" />
  </div>
</template>

<script setup>
const config = usePageConfig('button')
</script>
