<template>
  <va-navbar
    class="header"
    color="background-secondary"
  >
    <template #left>
      <header-selector
        class="mr-3"
        :minimized="isSidebarVisible"
        @toggleSidebar="toggleSidebar"
      />
      <NuxtLink
        v-slot="{ navigate, href }"
        :to="landing.to"
        custom
      >
        <a
          :href="href"
          :aria-label="landing.text"
          :title="landing.text"
          class="header-logo"
        >
          <vuestic-logo
            class="header-logo__image"
            height="30"
            width="150"
            aria-hidden="true"
            @click="navigate"
          />
        </a>
      </NuxtLink>
      <algolia-search class="header__searchbar" />
    </template>
    <template #right>
      <va-button
        v-for="(link, index) in links"
        :key="index"
        preset="secondary"
        class="mr-1"
        :to="link.to"
        :href="link.url"
        :target="link.target"
      >
        {{ link.text }}
      </va-button>
      <color-dropdown class="mr-2" />
      <language-dropdown
        class="mr-3"
        preset="secondary"
      />
      <theme-switch />
      <version-dropdown />
    </template>
  </va-navbar>
</template>

<script lang="ts" setup>
import LanguageDropdown from './header/LanguageDropdown.vue'
import VersionDropdown from './header/VersionDropdown.vue'
import ColorDropdown from './header/ColorDropdown.vue'
import HeaderSelector from './header/HeaderSelector.vue'
import VuesticLogo from './header/VuesticDocsLogo.vue'
import AlgoliaSearch from '@/components/AlgoliaSearch.vue'
import ThemeSwitch from './header/ThemeSwitch.vue'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { locale, t } = useI18n()

const landing = computed(() => ({
  text: t('menu.home'),
  to: `/${locale.value}`,
}))

const links = computed(() => [
  {
    text: t('menu.github'),
    url: 'https://github.com/epicmaxco/vuestic-ui',
    target: '_blank',
  },
  {
    text: t('menu.contribution'),
    to: `/${locale.value}/contribution/guide`,
  },
])

const props = defineProps({
  isSidebarVisible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:isSidebarVisible'])

const toggleSidebar = () => {
  emit('update:isSidebarVisible', !props.isSidebarVisible)
}
</script>

<style lang="scss">
@import "vuestic-ui/src/styles/resources";
@import "@/assets/smart-grid.scss";

.header {
  --va-navbar-mobile-height: auto;

  box-shadow: 0 2px 8px var(--va-shadow);

  .va-navbar__left {
    align-items: center;
    flex: 50%;

    @include sm(justify-content, space-between);
  }

  .va-navbar__right {
    align-items: center;
    flex: 50%;

    @include sm(display, none);
  }

  &__searchbar {
    margin-left: 1.5rem;

    @include sm(margin-left, 0);
  }

  &-logo {
    &__image {
      min-width: 160px;
      max-width: 160px;
    }

    @media screen and (max-width: 945px) {
      display: none;
    }

    @include media-breakpoint-down(sm) {
      display: block;
    }

    @include sm(display, block);
  }

  @media screen and (max-width: $break_xs) {
    padding: 0.75rem 22px;
  }
}
</style>
