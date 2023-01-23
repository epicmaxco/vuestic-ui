<template>
  <div class="page-config">
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

watchEffect(() => {
  if (!config.value?.meta?.title) { return }

  useHead({
    title: config.value?.meta?.title,
  });
})
</script>

<style lang="scss">
.page-config-title,
.page-config-subtitle,
.page-config-headline {

  .page-config-title+&,
  .page-config-subtitle+&,
  .page-config-headline+& {
    margin-top: 1rem !important;
  }
}

.page-config {

  .page-config-title,
  .page-config-subtitle,
  .page-config-headline {
    margin-top: 4rem;

    .page-config-title+&,
    .page-config-subtitle+&,
    .page-config-headline+& {
      margin-top: 2rem;
    }

    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
