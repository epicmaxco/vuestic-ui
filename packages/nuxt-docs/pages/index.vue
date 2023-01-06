<template>
  <va-content v-if="config">
    <PageConfig  :page-config="config" />
  </va-content>
  <div v-else>Loading</div>
</template>

<script setup lang="ts">
const config = usePageConfig('ui-elements/button')
</script>
