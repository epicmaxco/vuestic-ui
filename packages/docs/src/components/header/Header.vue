<template lang="html">
  <header class="header">
    <div class="header__logo">
      <div class="header__logo__wrapper">
        <header-selector
          class="header__logo__wrapper__selector mr-3"
          :minimized="isSidebarVisible"
          @toggleSidebar="toggleSidebar"
        />
        <router-link :to="overviewLink.to" custom v-slot="{ navigate, href }">
          <a :href="href" :aria-label="overviewLink.text" :title="overviewLink.text">
            <vuestic-logo
              class="header__logo__wrapper__image"
              height="30"
              width="150"
              aria-hidden="true"
              @click="navigate"
            />
          </a>
        </router-link>
      </div>
      <algolia-search />
    </div>
    <div class="header__nav">
      <div class="header__prefences sm-hidden">
        <va-button
          v-for="(link, index) in links"
          :key="index"
          preset="secondary"
          class="header__prefences__button mr-1"
          :to="link.to"
          :href="link.url"
          :target="link.target"
        >
          {{ link.text }}
        </va-button>
        <color-dropdown class="mr-2" />
        <language-dropdown class="mr-3" preset="secondary" />
        <version-dropdown />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Options, Vue, prop, mixins } from 'vue-class-component'
import LanguageDropdown from './components/LanguageDropdown.vue'
import VersionDropdown from './components/VersionDropdown.vue'
import ColorDropdown from './components/ColorDropdown.vue'
import HeaderSelector from './components/HeaderSelector.vue'
import VuesticLogo from './components/VuesticDocsLogo.vue'
import AlgoliaSearch from './components/algolia-search/AlgoliaSearch.vue'

class Props {
  isSidebarVisible = prop<boolean>({ type: Boolean, default: false })
}

const PropsMixin = Vue.with(Props)

@Options({
  name: 'DocsHeader',
  components: {
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

  get overviewLink () {
    return {
      text: this.$t('menu.overview'),
      to: `/${this.locale}/introduction/overview`,
    }
  }

  get links () {
    return [
      {
        text: this.$t('menu.overview'),
        to: `/${this.locale}`,
      },
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

<style lang="scss" scoped>
@import "~vuestic-ui/src/styles/resources";

.header {
  width: 100%;
  height: 4rem;
  padding: 0 calc(1.2rem + 4px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px var(--va-shadow);
  background-color: var(--va-background-secondary);

  @include media-breakpoint-down(sm) {
    .sm-hidden {
      display: none;
    }

    .header__logo__wrapper {
      margin-right: 0.25rem;
    }

    .header__nav {
      margin-left: 0.5rem;
    }
  }

  &__prefences {
    display: flex;
    align-items: center;
    font-weight: 700;

    &__button {
      --va-button-content-px: 1rem;

      .button__text {
        margin-left: 0.375rem;
      }

      @media screen and (max-width: 1209px) {
        .button__text {
          display: none;
        }
      }
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    flex-grow: 1;

    &__wrapper {
      display: flex;
      margin-right: 1.75rem;

      &__selector {
        flex-shrink: 0;
      }

      &__image {
        flex-shrink: 0;

        @media screen and (max-width: 945px) {
          display: none;
        }

        @include media-breakpoint-down(sm) {
          display: block;
        }

        @media screen and (max-width: 479px) {
          display: none;
        }

        max-width: 162px;
        min-width: 162px;
        cursor: pointer;
      }
    }
  }

  &__nav {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
