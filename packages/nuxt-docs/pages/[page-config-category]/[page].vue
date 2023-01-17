<template>
  <div>
    <PageConfig v-if="config" :pageConfig="config" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const config = usePageConfig(route.path.slice(1));

useHead({
  title: config.value?.meta.title,
});
</script>
