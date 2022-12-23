<template>
  <va-button-dropdown
    :label="currentLanguageName"
    :offset="[16, 0]"
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
        <va-list-item-section :style="{ color: option.code === locale ? colors.textPrimary : colors.primary }">
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
import { defineComponent, inject, computed } from 'vue'
import { useColors } from 'vuestic-ui/src/main'
import { useI18n } from 'vue-i18n'

import { LanguageSwitcherKey } from '../../../locales/hooks/useLanguageSwitcher'

export default defineComponent({
  name: 'DocsLanguageDropdown',
  setup () {
    const { locale, t } = useI18n()

    const { getColors } = useColors()
    const colors = computed(getColors)

    const { currentLanguageName, options, setLanguage } = inject(LanguageSwitcherKey, {
      options: [],
      setLanguage: () => undefined,
      currentLanguageName: undefined,
    })

    return {
      t,
      colors,
      locale,
      options,
      currentLanguageName,
      setLanguage,
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
