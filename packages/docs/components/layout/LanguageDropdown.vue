<template>
  <div class="language-dropdown">
    <va-button-dropdown
      :label="currentLocaleName"
      :offset="[0, 25]"
      color="primary"
      flat
    >
      <div class="language-dropdown__content">
        <va-list-item
          v-for="({code, name}, index) in locales"
          :key="index"
          :class="{ active: code === locale }"
          class="language-dropdown__item row align--center py-2"
          @click="setLocale(code)"
        >
          <va-list-item-section :style="{color: colors.primary}">
            <span class="dropdown-item__text">{{ name }}</span>
          </va-list-item-section>
        </va-list-item>
        <va-list-item class="language-dropdown__item row align--center py-2">
          <va-list-item-section>
            <router-link
              :to="`/${locale}/contribution/translation`"
              class="dropdown-item__text"
              :style="{color: colors.primary}"
            >
              {{ t('landing.header.buttons.translation') }}
            </router-link>
          </va-list-item-section>
        </va-list-item>
      </div>
    </va-button-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { useColors } from 'vuestic-ui'
import { useSharedLanguageSwitcher } from '../../composables/useLanguageSwitcher'

const { colors } = useColors()
const { t, locale, locales, currentLocaleName, setLocale } = useSharedLanguageSwitcher()
</script>

<style lang="scss">
.language-dropdown {
  font-weight: 700;
  cursor: pointer;

  .va-button__content {
    font-weight: bold;
  }

  &__item {
    cursor: pointer;
    flex-wrap: nowrap;

    &:hover,
    &.active {
      .dropdown-item__text {
        color: var(--va-dark);
      }
    }
  }

  .va-dropdown__anchor {
    display: inline-block;
  }
}
</style>
