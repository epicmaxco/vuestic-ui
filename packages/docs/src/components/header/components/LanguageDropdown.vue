<template>
  <div class="language-dropdown">
    <va-button-dropdown
      color="primary"
      flat
      :label="currentLanguageName"
      :offset="[0, 25]"
    >
      <div class="language-dropdown__content">
        <!-- <va-list-item
          v-for="(option, id) in options"
          :key="id"
          class="language-dropdown__item row align--center py-2"
          :class="{ active: option.code === locale }"
          @click="setLanguage(option.code)"
        >
          <va-list-item-section :style="{color: colors.primary}">
            <span class="dropdown-item__text">{{ option.name }}</span>
          </va-list-item-section>
        </va-list-item> -->
        <va-list-item class="language-dropdown__item row align--center py-2">
          <va-list-item-section>
            <router-link :to="`/${locale}/contribution/translation`" class="dropdown-item__text" :style="{color: colors.primary}">{{t('landing.header.buttons.translation')}}</router-link>
          </va-list-item-section>
        </va-list-item>
      </div>
    </va-button-dropdown>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { getColors } from 'vuestic-ui/src/main'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup () {
    // const options = languages
    const options = [{ name: 'English', code: 'en' }]
    const { locale, t } = useI18n()

    const setLanguage = (local: string) => null
    const colors = computed(getColors)
    const currentLanguageName = computed(() => options.find(({ code }) => code === locale.value)?.name)

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
  font-weight: 700;
  cursor: pointer;

  .va-button__content {
    font-weight: bold;
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
