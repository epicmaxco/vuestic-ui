<template lang="html">
  <va-navbar class="header" color="background-secondary">
    <template #left>
      <header-selector
        class="mr-3"
        :minimized="isSidebarVisible"
        @toggleSidebar="toggleSidebar"
      />
      <router-link :to="landing.to" custom v-slot="{ navigate, href }">
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
      </router-link>
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
      <language-dropdown class="mr-3" preset="secondary" />
      <theme-switch />
      <version-dropdown />
    </template>
  </va-navbar>
</template>

<script lang="ts">
import { Options, Vue, prop, mixins } from 'vue-class-component'
import LanguageDropdown from './components/LanguageDropdown.vue'
import VersionDropdown from './components/VersionDropdown.vue'
import ColorDropdown from './components/ColorDropdown.vue'
import HeaderSelector from './components/HeaderSelector.vue'
import VuesticLogo from './components/VuesticDocsLogo.vue'
import AlgoliaSearch from './components/algolia-search/AlgoliaSearch.vue'
import ThemeSwitch from '@/components/ThemeSwitch.vue'

class Props {
  isSidebarVisible = prop<boolean>({ type: Boolean, default: false })
}

const PropsMixin = Vue.with(Props)

@Options({
  name: 'DocsHeader',
  components: {
    ThemeSwitch,
    HeaderSelector,
    LanguageDropdown,
    ColorDropdown,
    VersionDropdown,
    VuesticLogo,
    AlgoliaSearch,
  },
})

export default class Header extends mixins(PropsMixin) {
  get locale () {
    return this.$root?.$i18n?.locale
  }

  get landing () {
    return {
      text: this.$t('menu.home'),
      to: `/${this.locale}`,
    }
  }

  get links () {
    return [
      {
        text: this.$t('menu.github'),
        url: 'https://github.com/epicmaxco/vuestic-ui',
        target: '_blank',
      },
      {
        text: this.$t('menu.contribution'),
        to: `/${this.locale}/contribution/documentation-page`,
      },
    ]
  }

  toggleSidebar () {
    this.$emit('update:isSidebarVisible', !this.isSidebarVisible)
  }
}
</script>

<style lang="scss">
@import "~vuestic-ui/src/styles/resources";
@import '@/assets/smart-grid.scss';

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
