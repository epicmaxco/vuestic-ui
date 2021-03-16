<template>
  <va-dropdown class="language-dropdown" :offset="[0, 25]" fixed>
    <template #anchor>
      <va-button class="language-dropdown__button" iconRight="expand_more" flat square color="primary">
        {{currentLanguageName}}
      </va-button>
    </template>
  <va-list class="language-dropdown__content">
    <va-list-item
      v-for="(option, id) in options"
      :key="id"
      class="language-dropdown__item row align--center py-2"
      :class="{ active: option.code === currentLanguage }"
      @click="setLanguage(option.code)"
    >
      <va-list-item-section :style="{color: themes.primary}">
        <span class="dropdown-item__text">{{ option.name }}</span>
      </va-list-item-section>
    </va-list-item>
    <va-list-item class="language-dropdown__item row align--center py-2">
      <va-list-item-section>
        <router-link :to="`/${$root.$i18n.locale}/contribution/translation`" class="dropdown-item__text" :style="{color: themes.primary}">{{$t('landing.header.buttons.translation')}}</router-link>
      </va-list-item-section>
    </va-list-item>
  </va-list>
  </va-dropdown>
</template>

<script>
// @ts-nocheck
import { Options, Vue, setup } from 'vue-class-component'
import { languages } from './../../languages'
import { useTheme } from 'vuestic-ui'

@Options({
  name: 'language-dropdown',
})
export default class LanguageDropdown extends Vue {
  options = languages

  setLanguage (locale) {
    this.$root.$i18n.locale = locale
    document.querySelector('html').setAttribute('lang', locale)
    localStorage.setItem('VueAppLanguage', locale)
    this.$nextTick(() => {
      // a little hack to change the same route alias
      const path = this.$localizePath(this.$route.fullPath, locale)
      this.$router.replace({ path, hash: `#${+new Date()}` }).then(() => this.$router.replace({ hash: '' }))
    })
  }

  get themes () {
    return this.getColors()
  }

  getTheme = setup(() => {
    const { getTheme } = useTheme()
    return getTheme
  })

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
@import "~vuestic-ui-dev/src/components/vuestic-sass/resources/resources";

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
