<template>
  <header class="docs-header px-3">
    <div class="docs-header__logo">
      <LayoutDocsHeaderCollapseIcon />
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
        {{ link.text }}
      </va-button>
    </div>

    <div class="docs-header__preferences">

    </div>
  </header>
</template>

<script setup lang="ts">
const { locale, t } = useI18n()

const props = defineProps({
  isSidebarVisible: { type: Boolean }
})
const emit = defineEmits(['update:isSidebarVisible'])

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

const toggleSidebar = () => {
  emit('update:isSidebarVisible', !props.isSidebarVisible)
}
</script>

<style lang="scss" scoped>
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
}
</style>