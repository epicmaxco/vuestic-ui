<template>
  <div>
    <PageConfig v-if="config" :pageConfig="config" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { locale } = useI18n()

const pageConfigName = computed(() => {
  const path = route.path
  const localePrefix = `/${locale.value}/`

  if (path.startsWith(localePrefix)) {
    return path.replace(localePrefix, '')
  }

  return path
})

const config = usePageConfig(pageConfigName);

useHead({
  title: config.value?.meta.title,
});
</script>
