<template>
  <header class="docs-header px-3">
    <div class="docs-header__logo">
      <LayoutDocsHeaderCollapseIcon v-model="computedIsSidebarVisible" />
      <LayoutDocsHeaderVuesticDocsLogo class="ml-3" />
    </div>
  
    <div class="docs-header__links">
      <va-button
        v-for="(link, index) in links"
        :key="index"
        :to="link.to"
        :href="link.url"
        :target="link.target"
        :icon="link.icon"
        class="ml-2"
        color="primary"
        flat
      >
        <span v-if="!sm">{{ link.text }}</span>
      </va-button>
    </div>

    <div class="docs-header__preferences">
      <LayoutDocsHeaderVersionDropdown />
      <LayoutDocsHeaderLanguageDropdown />
    </div>
  </header>
</template>

<script setup lang="ts">
const { t } = useI18n()

const { sm } = useBreakpoint()

const props = defineProps({ isSidebarVisible: { type: Boolean } })
const emit = defineEmits(['update:isSidebarVisible'])

const computedIsSidebarVisible = computed({
  get() { return props.isSidebarVisible },
  set(val: boolean) { emit('update:isSidebarVisible', val) }
})

const { query } = useRoute()

const urlPrefix = computed(() => query.locale ? `/${query.locale}` : '')

const links = computed(() => [
  {
    text: t('menu.overview'),
    icon: 'fa-eye',
    to: `${urlPrefix.value}/introduction/overview`,
  },
  {
    text: t('menu.github'),
    icon: 'fa-github',
    url: 'https://github.com/epicmaxco/vuestic-ui',
    target: '_blank',
  },
  {
    text: t('menu.contribution'),
    icon: 'fa-share-alt',
    to: `${urlPrefix.value}/contribution/documentation-page`,
  },
])
</script>

<style lang="scss" scoped>
@import "vuestic-ui/styles/resources";

.docs-header {
  width: 100%;
  height: 4rem;
  box-shadow: 0 2px 8px rgba(122, 139, 173, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > * {
    display: flex;
    align-items: center;
  }

  &__preferences {
    font-weight: 700;
  }
}
</style>