<template>
  <div class="page-config">
    <PageConfig
      v-if="!isLoading && config"
      :page-config="config"
    />
    <PageConfigSkeleton v-else />
  </div>
</template>

<script lang="ts" setup>
import { ConcreteBlock } from '../../modules/page-config/runtime';

definePageMeta({
  layout: 'default',
  scrollToTop: true,
})

const route = useRoute();

const pageConfigName = computed(() => {
  const path = route.path

  return path.slice(1)
})

const { config, isLoading } = await usePageConfig(pageConfigName);
const tabTitlePrefix = 'Vuestic UI'

const router = useRouter()
watch(config, () => {
  if (!config.value) {
    router.push('/404')
  }
}, { immediate: true })

watchEffect(() => {
  const configTitle = config.value?.blocks.find((block) => block.type === 'title') as ConcreteBlock<'title'> | undefined
  const tabTitle = configTitle?.text || config.value?.meta?.title

  useHead({
    title: tabTitle ? `${tabTitlePrefix} - ${tabTitle}` : tabTitlePrefix,
    meta: {
      description: tabTitle ? `${tabTitlePrefix} ${tabTitle} documentation page` : `${tabTitlePrefix} documentation page`
    } as any
  });
})
</script>

<style lang="scss">
.page-config-title,
.page-config-subtitle,
.page-config-headline {
  .page-config-title + &,
  .page-config-subtitle + &,
  .page-config-headline + & {
    margin-top: 1rem !important;
  }
}

.page-config {
  padding-bottom: 3rem;

  .page-config-title,
  .page-config-subtitle,
  .page-config-headline {
    margin-top: 4rem;

    .page-config-title + &,
    .page-config-subtitle + &,
    .page-config-headline + & {
      margin-top: 2rem;
    }

    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
