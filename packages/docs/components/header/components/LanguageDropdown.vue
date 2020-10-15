<template>
  <va-dropdown class="language-dropdown" :offset="[0, 25]" fixed>
    <va-button iconRight="expand_more" flat square slot="anchor" color="primary">
      <va-icon :class="['flag-icon flag-icon-large', flagIconClass(currentLanguage)]"></va-icon>
    </va-button>
  <va-list class="language-dropdown__content">
    <va-list-item
      v-for="(option, id) in options"
      :key="id"
      class="language-dropdown__item row align--center py-2"
      :class="{ active: option.code === currentLanguage }"
      @click="setLanguage(option.code)"
    >
      <va-list-item-section icon>
        <va-icon :class="['flag-icon flag-icon-small', flagIconClass(option.code)]" />
      </va-list-item-section>
      <va-list-item-section :style="{color: primaryColor}">
        <span class="dropdown-item__text">{{ $t(`language.${option.name}`) }}</span>
      </va-list-item-section>
    </va-list-item>
  </va-list>
  </va-dropdown>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import VaIcon from 'vuestic-ui/src/components/vuestic-components/va-icon/VaIcon.vue'
import VaDropdown from 'vuestic-ui/src/components/vuestic-components/va-dropdown/VaDropdown.vue'
import VaButton from 'vuestic-ui/src/components/vuestic-components/va-button/VaButton.vue'
import { ColorThemeMixin } from '../../../../ui/src/services/ColorThemePlugin'
@Component({
  name: 'language-dropdown',
  mixins: [ColorThemeMixin],
  components: {
    VaIcon,
    VaDropdown,
    VaButton,
  },
  props: {
    options: {
      type: Array,
      default: () => [
        {
          code: 'en',
          name: 'english',
        },
        {
          code: 'es',
          name: 'spanish',
        },
        {
          code: 'br',
          name: 'brazilian_portuguese',
        },
        {
          code: 'cn',
          name: 'simplified_chinese',
        },
      ],
    },
  },
})
export default class LanguageDropdown extends Vue {
  setLanguage (locale) {
    localStorage.setItem('currentLanguage', locale)
    this.$root.$i18n.setLocale(locale)
  }

  get primaryColor () {
    return this.computeColor('primary')
  }

  get currentLanguage () {
    return this.$root.$i18n.locale
  }

  flagIconClass (code) {
    return `flag-icon-${code === 'en' ? 'gb' : code}`
  }
}
</script>

<style lang="scss">
@import "flag-icon-css/css/flag-icon.css";
@import "vuestic-ui/src/components/vuestic-sass/resources/resources";

.language-dropdown {
  cursor: pointer;

  &__content {
    box-shadow: $gray-box-shadow;
    border-radius: 0.5rem;
    width: 12rem;
    padding: 1rem 0;

    .flag-icon-small {
      min-width: 1.5rem;
      min-height: 1.5rem;
      margin-right: 0.5rem;
    }
  }

  &__item {
    padding-bottom: 0.625rem;
    cursor: pointer;
    flex-wrap: nowrap;

    &:hover,
    &.active {
      .dropdown-item__text {
        color: #1b1a1f;
      }
    }
  }

  .flag-icon::before {
    content: "";
  }

  .flag-icon-large {
    display: block;
    width: 31px;
    height: 23px;
  }

  .va-dropdown__anchor {
    display: inline-block;
  }
}
</style>
