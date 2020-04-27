<template>
  <va-dropdown class="language-dropdown" :offset="[0, 25]" fixed>
    <va-icon slot="anchor" :class="['flag-icon flag-icon-large', flagIconClass(currentLanguage)]" />
    <div class="language-dropdown__content pl-4 pr-4 pt-2 pb-2">
      <div
        v-for="(option, id) in options"
        :key="id"
        class="language-dropdown__item row align--center pt-1 pb-1 mt-2 mb-2"
        :class="{ active: option.code === currentLanguage }"
        @click="setLanguage(option.code)"
      >
        <va-icon :class="['flag-icon flag-icon-small', flagIconClass(option.code)]" />
        <span class="dropdown-item__text">{{ $t(`language.${option.name}`) }}</span>
      </div>
    </div>
  </va-dropdown>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import VaIcon from 'vuestic-ui/src/components/vuestic-components/va-icon/VaIcon.vue'
import VaDropdown from 'vuestic-ui/src/components/vuestic-components/va-dropdown/VaDropdown.vue'
import VaButton from 'vuestic-ui/src/components/vuestic-components/va-button/VaButton.vue'
@Component({
  name: 'language-dropdown',
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
          code: 'gb',
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

  get currentLanguage () {
    return this.$root.$i18n.locale === 'en' ? 'gb' : this.$root.$i18n.locale
  }

  flagIconClass (code) {
    return `flag-icon-${code}`
  }
}
</script>

<style lang="scss">
@import "flag-icon-css/css/flag-icon.css";
@import "../../../../ui/src/components/vuestic-sass/resources/resources";

.language-dropdown {
  cursor: pointer;

  &__content {
    background-color: $dropdown-background;
    box-shadow: $gray-box-shadow;
    border-radius: 0.5rem;
    width: 12rem;

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

    &:last-of-type {
      padding-bottom: 0 !important;
    }

    &:hover,
    &.active {
      color: $vue-green;
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
