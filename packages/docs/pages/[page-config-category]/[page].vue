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
import { type ConcreteBlock } from '../../modules/page-config/runtime';

definePageMeta({
  pageTransition: { name: 'page', mode: 'out-in' },
  layout: 'default',
  scrollToTop: true,
  // See: https://github.com/nuxt/nuxt/issues/13309
  layoutTransition: true,
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
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

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
