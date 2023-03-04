<template>
  <ClientOnly>
    <div class="page-config">
      <PageConfig
        v-if="config"
        :page-config="config"
      />
      <PageConfigSkeleton v-else />
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { ConcreteBlock } from '../../modules/page-config/runtime';

definePageMeta({
  layout: 'default',
  scrollToTop: true,
})

const route = useRoute();
const { locale, t, mergeLocaleMessage, fallbackLocale } = useI18n()

const pageConfigName = computed(() => {
  const path = route.path
  const localePrefix = `/${locale.value}/`

  if (path.startsWith(localePrefix)) {
    return path.replace(localePrefix, '')
  }

  return path.slice(1)
})

const config = await usePageConfig(pageConfigName);
const tabTitlePrefix = 'Vuestic UI'

const compileTranslations = (translations: Record<string, any>): any => {
  if (Array.isArray(translations)) {
    return translations.map((translation) => compileTranslations(translation))
  }

  const compiledTranslations: Record<string, any> = {}

  Object.keys(translations).forEach((key) => {
    if (typeof translations[key] === 'string') { 
      compiledTranslations[key] = translations[key].replaceAll(/\{['|"|`](.*)['|"|`]\}/g, '$1')
    } else {
      compiledTranslations[key] = compileTranslations(translations[key])
    }
  })

  return compiledTranslations
}

const mergeTranslations = () => {
  const configTranslations = config.value?.translations?.[locale.value]

  if (!configTranslations) { return }

  // extract installation from getting-started/installation
  const [translationKey] = pageConfigName.value.split('/').slice(-1)

  mergeLocaleMessage(locale.value, {
    [translationKey]: compileTranslations(configTranslations),
  })
}

const mergeFallbackTranslations = () => {
  if (!fallbackLocale.value && typeof fallbackLocale.value !== 'string') { return }

  const language = fallbackLocale.value as string

  const configTranslations = config.value?.translations?.[language]

  if (!configTranslations) { return }

  // extract installation from getting-started/installation
  const [translationKey] = pageConfigName.value.split('/').slice(-1)

  mergeLocaleMessage(language, {
    [translationKey]: compileTranslations(configTranslations),
  })
}

watchEffect(() => {
  const configTitle = config.value?.blocks.find((block) => block.type === 'title') as ConcreteBlock<'title'> | undefined

  const tabTitle = configTitle?.text || config.value?.meta?.title

  mergeTranslations()
  mergeFallbackTranslations()

  useHead({
    title: tabTitle ? `${tabTitlePrefix} - ${t(tabTitle)}` : tabTitlePrefix,
    meta: {
      description: tabTitle ? `${tabTitlePrefix} ${t(tabTitle)} documentation page` : `${tabTitlePrefix} documentation page`
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
