<template>
  <div class="language-dropdown">
    <va-button-dropdown
      :label="currentLanguageName"
      :offset="[0, 25]"
      color="primary"
      flat
    >
      <div class="language-dropdown__content">
        <va-list-item
          v-for="(option, index) in options"
          :key="index"
          :class="{ active: option.code === locale }"
          class="language-dropdown__item row align--center py-2"
          @click="setLanguage(option.code)"
        >
          <va-list-item-section :style="{color: colors.primary}">
            <span class="dropdown-item__text">{{ option.name }}</span>
          </va-list-item-section>
        </va-list-item>
        <va-list-item class="language-dropdown__item row align--center py-2">
          <va-list-item-section>
            <router-link :to="`/${locale}/contribution/translation`" class="dropdown-item__text" :style="{color: colors.primary}">{{t('landing.header.buttons.translation')}}</router-link>
          </va-list-item-section>
        </va-list-item>
      </div>
    </va-button-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { getColors } from 'vuestic-ui'
import { languages } from '../../locales'

const { locale, t } = useI18n()

const setLanguage = (newLocale: string) => { locale.value = newLocale }

const options = languages
const colors = computed(getColors)
const currentLanguageName = computed(() => options.find(({ code }) => code === locale.value)?.name)
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
