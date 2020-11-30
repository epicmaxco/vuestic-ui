<template>
  <va-dropdown class="language-dropdown" :offset="[0, 25]" fixed>
    <va-button class="language-dropdown__button" iconRight="expand_more" flat square slot="anchor" color="primary">
      {{currentLanguageName}}
    </va-button>
  <va-list class="language-dropdown__content">
    <va-list-item
      v-for="(option, id) in options"
      :key="id"
      class="language-dropdown__item row align--center py-2"
      :class="{ active: option.code === currentLanguage }"
      @click="setLanguage(option.code)"
    >
      <va-list-item-section :style="{color: primaryColor}">
        <span class="dropdown-item__text">{{ option.name }}</span>
      </va-list-item-section>
    </va-list-item>
    <va-list-item class="language-dropdown__item row align--center py-2">
      <va-list-item-section>
        <nuxt-link :to="`/${$root.$i18n.locale}/contribution/translation`" class="dropdown-item__text" :style="{color: primaryColor}">{{$t('landing.header.buttons.translation')}}</nuxt-link>
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
import { languages } from './../../languages'
@Component({
  name: 'language-dropdown',
  mixins: [ColorThemeMixin],
  components: {
    VaIcon,
    VaDropdown,
    VaButton,
  },
})
export default class LanguageDropdown extends Vue {
  options = languages

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

  get currentLanguageName () {
    const result = this.options.find(({ code }) => code === this.currentLanguage)
    return result.name
  }
}
</script>

<style lang="scss" scoped>
@import "vuestic-ui/src/components/vuestic-sass/resources/resources";

.language-dropdown {
  cursor: pointer;

  &__button {
    font-weight: 700;
  }

  &__content {
    background-color: #f7f7f7 !important;
    box-shadow: $gray-box-shadow;
    border-radius: 0.5rem;
    min-width: 10rem;
    padding: 1rem 0.5rem;
    margin-right: 0.1rem;
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

  .va-dropdown__anchor {
    display: inline-block;
  }
}
</style>
