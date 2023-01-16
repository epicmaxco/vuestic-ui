<template>
  <div>
    <PageConfig v-if="config" :pageConfig="config" />
  </div>
</template>

<script setup>
const config = usePageConfig('ui-elements/button')
</script>
