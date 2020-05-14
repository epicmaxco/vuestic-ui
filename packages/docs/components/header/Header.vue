<template lang="html">
  <div class="header row">
    <div class="header__logo flex row">
      <header-selector :minimized="isSidebarVisible" @toggleSidebar="toggleSidebar" />
      <img class="header__logo__image" src="../../assets/svg/vuestic-docs.svg" height="30" width="150">
    </div>
    <div class="header__links flex">
      <div v-for="(link, index) in links" :key="index" class="header__link__wrapper flex">
        <va-button
          flat
          class="header__links__button"
          color="primary"
          :href="link.url"
          target="_blank"
        >
          <i class="button__icon" :class="link.icon" />
          <span class="button__text">{{ link.text }}</span>
        </va-button>
      </div>
    </div>
    <div class="header__prefences flex">
      <version-dropdown />
      <color-dropdown />
      <language-dropdown />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import VaButton from '../../../ui/src/components/vuestic-components/va-button/VaButton.vue'
import VaSelect from '../../../ui/src/components/vuestic-components/va-select/VaSelect.vue'
import LanguageDropdown from './components/LanguageDropdown.vue'
import VersionDropdown from './components/VersionDropdown.vue'
import ColorDropdown from './components/ColorDropdown.vue'
import HeaderSelector from './components/HeaderSelector.vue'
@Component({
  components: {
    VaButton,
    HeaderSelector,
    VaSelect,
    LanguageDropdown,
    ColorDropdown,
    VersionDropdown,
  },
})
export default class Header extends Vue {
  @Prop({
    type: Boolean,
  })
  readonly isSidebarVisible!: boolean

  data () {
    return {
      links: [
        {
          text: 'Overview',
          icon: 'vuestic-iconset-dashboard',
          url: '#',
        },
        {
          text: 'Documentation',
          icon: 'fa fa-cube',
          url: '#', // TODO: add actual links when pages are ready
        },
        {
          text: 'GitHub',
          icon: 'fa fa-github',
          url: 'https://github.com/epicmaxco/vuestic-ui',
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
@import "../../../ui/src/components/vuestic-sass/resources/resources";
@import "../../../ui/src/components/vuestic-sass/grid/grid-global-styles";
@import "../../../ui/src/components/vuestic-sass/global/typography";

.header {
  position: fixed;
  width: 100%;
  height: 64px;
  box-shadow: 0 2px 8px rgba(122, 139, 173, 0.2);

  &__links__button {
    font-weight: $font-weight-bold;

    .button__icon {
      margin-right: 0.5em;
    }

    @include media-breakpoint-down(md) {
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

    justify-content: space-between;
  }

  &__logo {
    justify-content: flex-start;

    &__image {
      max-width: 200px;
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
