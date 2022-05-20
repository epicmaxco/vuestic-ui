<template>
  <header class="docs-header px-3">
    <div class="docs-header__logo">
      <LayoutDocsHeaderCollapseIcon v-model="computedIsSidebarVisible" />
      <router-link to="/">
        <LayoutDocsHeaderVuesticDocsLogo class="ml-3" />
      </router-link>
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
      <CommonLanguageDropdown />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  props: { isSidebarVisible: { type: Boolean } },

  emits: ['update:isSidebarVisible'],

  setup(props, { emit }) {
    const { t, localizePath } = useI18n()
    const { sm } = useBreakpoint()

    const computedIsSidebarVisible = computed({
      get() { return props.isSidebarVisible },
      set(val: boolean) { emit('update:isSidebarVisible', val) }
    })

    const links = computed(() => [
      {
        text: t('menu.overview'),
        icon: 'fa-eye',
        to: localizePath(`/introduction/overview`),
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
        to: localizePath(`/contribution/documentation-page`),
      },
    ])

    return {
      sm, links, computedIsSidebarVisible
    }
  }
})
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
