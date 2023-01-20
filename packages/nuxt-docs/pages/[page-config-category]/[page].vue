<template>
  <div>
    <PageConfig v-if="config" :pageConfig="config" />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'default',
})

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


// watchEffect(() => {
//   if (!config.value?.meta?.title) { return }

//   useHead({
//     title: config.value?.meta?.title,
//   });
// })
</script>
