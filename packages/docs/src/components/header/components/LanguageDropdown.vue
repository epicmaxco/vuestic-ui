<template>
  <va-button-dropdown
    preset="secondary"
    :label="currentLanguageName"
    :offset="[10, 0]"
    size="medium"
    class="language-dropdown"
    prevent-overflow
    v-bind="$attrs"
  >
    <div class="language-dropdown__content">
      <va-list-item
        v-for="(option, id) in options"
        :key="id"
        class="language-dropdown__item row align-center py-2 va-link"
        :class="{ active: option.code === locale }"
        @click="setLanguage(option.code)"
      >
        <va-list-item-section :style="{color: colors.primary}">
          <span class="dropdown-item__text">{{ option.name }}</span>
        </va-list-item-section>
      </va-list-item>
      <va-list-item
        class="language-dropdown__item va-link row align-center py-2"
        :to="`/${locale}/contribution/translation`"
      >
        <va-list-item-section :style="{color: colors.primary}">
          <span class="dropdown-item__text">
            {{ $t('landing.header.buttons.translation') }}
          </span>
        </va-list-item-section>
      </va-list-item>
    </div>
  </va-button-dropdown>
</template>

<script lang="ts">
import { defineComponent, computed, watch, onMounted } from 'vue'
import { useColors } from 'vuestic-ui/src/main'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { languages } from '../../../locales'

export default defineComponent({
  name: 'DocsLanguageDropdown',
  setup () {
    const { locale, t } = useI18n()
    const router = useRouter()

    const getCurrentPathWithoutLocale = () => {
      const path = router.currentRoute.value.fullPath
      const localeUrlPart = `/${locale.value}`

      if (path.slice(0, localeUrlPart.length) === localeUrlPart) { return path.slice(localeUrlPart.length) }

      return path
    }

    const setLanguage = (newLocale: string) => {
      if (locale.value === newLocale) { return }

      localStorage.setItem('language', newLocale)

      const currentPathWithoutLocale = getCurrentPathWithoutLocale()

      router.push('/' + newLocale + currentPathWithoutLocale)
    }

    const options = languages
    const { getColors } = useColors()
    const colors = computed(getColors)
    const currentLanguageName = computed(() => options.find(({ code }) => code === locale.value)?.name)

    const setHtmlLang = () => {
      if (!document?.documentElement) { return }

      document.documentElement.setAttribute('lang', locale.value || 'en')
    }

    onMounted(setHtmlLang)
    watch(locale, setHtmlLang)

    return {
      colors,
      options,
      setLanguage,
      locale,
      t,
      currentLanguageName,
    }
  },
})
</script>

<style lang="scss">
  .language-dropdown {
    cursor: pointer;

    .va-button__content {
      font-weight: 600;
    }

    &__item {
      padding-bottom: 0.625rem;
      cursor: pointer;
      flex-wrap: nowrap;
      font-weight: 600;
    }

    .va-dropdown__anchor {
      display: inline-block;
    }
  }
</style>
