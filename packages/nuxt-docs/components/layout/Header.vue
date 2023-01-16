<template>
  <header class="docs-header px-3">
    <div class="docs-header__logo">
      <LayoutIconsCollapseIcon v-model="computedIsSidebarVisible" />
      <router-link to="/">
        <LayoutIconsVuesticLogo class="ml-3" />
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
        preset
      >
        <span v-if="!sm">{{ link.text }}</span>
      </va-button>
    </div>

    <div class="docs-header__preferences">
      <!-- <LayoutDocsHeaderVersionDropdown /> -->
      <LayoutLanguageDropdown />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: { isSidebarVisible: { type: Boolean } },

  emits: ['update:isSidebarVisible'],

  setup(props, { emit }) {
    const { t } = useI18n()
    const localePath = useLocaleRoute()
    const { sm } = useBreakpoint()

    const computedIsSidebarVisible = computed({
      get() { return props.isSidebarVisible },
      set(val: boolean) { emit('update:isSidebarVisible', val) }
    })

    const links = computed(() => [
      {
        text: t('menu.overview'),
        icon: 'fa-eye',
        to: localePath(`/introduction/overview`),
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
        to: localePath(`/contribution/documentation-page`),
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
