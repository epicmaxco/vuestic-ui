<template>
  <va-button-dropdown
    :label="currentLocaleName"
    :offset="[8, 0]"
    class="language-dropdown"
    prevent-overflow
    v-bind="$attrs"
  >
    <div class="language-dropdown__content">
      <va-list-item
        v-for="({ code, name }, id) in locales"
        :key="id"
        class="language-dropdown__item row align-center va-link"
        :class="{ active: code === locale }"
        @click="setLocale(code)"
      >
        <va-list-item-section :style="{ color: code === locale ? colors.textPrimary : colors.primary }">
          <span class="dropdown-item__text">{{ name }}</span>
        </va-list-item-section>
      </va-list-item>
      <va-list-item
        class="language-dropdown__item va-link row align-center"
        :to="`/${locale}/contribution/translation`"
      >
        <va-list-item-section :style="{ color: colors.primary }">
          <span class="dropdown-item__text">
            {{ t('landing.header.buttons.translation') }}
          </span>
        </va-list-item-section>
      </va-list-item>
    </div>
  </va-button-dropdown>
</template>

<script lang="ts" setup>
import { useColors } from 'vuestic-ui'
import { useSharedLanguageSwitcher } from '@/composables/useLanguageSwitcher'

const { colors } = useColors()
const { t, locale, locales, currentLocaleName, setLocale } = useSharedLanguageSwitcher()
</script>

<style lang="scss">
.language-dropdown {
  .va-dropdown {
    vertical-align: text-bottom;
  }

  .va-button__content {
    font-weight: 600;
  }

  &__item {
    padding: 0.5rem 0;
    flex-wrap: nowrap;
    font-weight: 600;
  }

  .va-dropdown__anchor {
    display: inline-block;
  }
}
</style>
