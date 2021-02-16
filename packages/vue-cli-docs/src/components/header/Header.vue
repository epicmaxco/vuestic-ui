<template lang="html">
  <header class="header row justify--space-between">
    <div class="header__logo flex">
      <header-selector class="header__logo__selector" :minimized="isSidebarVisible" @toggleSidebar="toggleSidebar" />
      <vuestic-logo class="header__logo__image"  height="30" width="150" />
    </div>
    <div class="header__links flex grow justify--center">
      <div class="shrink">
        <va-button
          v-for="(link, index) in links" :key="index"
          flat
          class="header__links__button"
          color="primary"
          :to="link.to"
          :href="link.url"
          :target="link.target"
        >
          <va-icon class="button__icon" :class="link.icon" />
          <span class="button__text">{{ link.text }}</span>
        </va-button>
      </div>
    </div>
    <div class="header__prefences flex">
      <version-dropdown />
      <color-dropdown />
      <language-dropdown />
    </div>
  </header>
</template>

<script lang="ts">
import { Options, Vue, prop, mixins } from 'vue-class-component'
import LanguageDropdown from './components/LanguageDropdown.vue'
import VersionDropdown from './components/VersionDropdown.vue'
import ColorDropdown from './components/ColorDropdown.vue'
import HeaderSelector from './components/HeaderSelector.vue'
import VuesticLogo from './components/VuesticLogo.vue'

class Props {
  isSidebarVisible = prop<boolean>({ type: Boolean, default: false })
}

const PropsMixin = Vue.with(Props)

@Options({
  components: {
    HeaderSelector,
    LanguageDropdown,
    ColorDropdown,
    VersionDropdown,
    VuesticLogo,
  },
})
export default class Header extends mixins(PropsMixin) {
  data () {
    return {
      links: [
        {
          text: 'Overview',
          icon: 'fa fa-eye',
          to: `/${(this as any).$root.$i18n.locale}/introduction/overview`,
        },
        {
          text: 'Documentation',
          icon: 'fa fa-cube',
          url: '#', // TODO: add actual links when pages are ready
          target: '_blank',
        },
        {
          text: 'GitHub',
          icon: 'fa fa-github',
          url: 'https://github.com/epicmaxco/vuestic-ui',
          target: '_blank',
        },
        {
          text: 'Contribution',
          icon: 'fa fa-share-alt',
          to: `/${(this as any).$root.$i18n.locale}/contribution/documentation-page`,
        },
      ],
    }
  }

  toggleSidebar () {
    this.$emit('update:isSidebarVisible', !this.isSidebarVisible)
  }
}
</script>

<style lang="scss" scoped>
@import "~vuestic-ui-dev/src/components/vuestic-sass/resources/resources";
@import "~vuestic-ui-dev/src/components/vuestic-sass/grid/grid-global-styles";
@import "~vuestic-ui-dev/src/components/vuestic-sass/global/typography";

.header {
  z-index: 2000 !important;
  position: fixed;
  width: 100%;
  height: 4rem;
  box-shadow: 0 2px 8px rgba(122, 139, 173, 0.2);

  @include media-breakpoint-down(sm) {
    height: 8rem;

    &__links {
      justify-content: flex-end !important;

      @media screen and (max-width: 479px) {
        justify-content: center !important;
      }
    }

    &__prefences {
      flex: 1 1 !important;
      justify-content: space-between;

      & .va-dropdown__anchor,
      .color-dropdown {
        display: flex;
        justify-content: center;
      }
    }
  }

  &__links__button {
    font-weight: $font-weight-bold;

    .button__text {
      margin-left: 0.375rem;
    }

    @media screen and (max-width: 1209px) {
      .button__text {
        display: none;
      }
    }
  }

  &,
  &__links,
  &__prefences,
  &__logo {
    @include va-flex-center();
  }

  &__logo {
    &__selector {
      min-width: 3.5rem;
      width: 3.5rem;
    }

    &__image {
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
    }
  }

  &__prefences {
    justify-content: flex-end;
    font-weight: $font-weight-bold;

    &__dropdown {
      max-width: 100px;
    }

    &__option {
      padding: 5px;
    }
  }
}
</style>
