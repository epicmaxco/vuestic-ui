<template>
  <div class="color-dropdown">
    <va-badge text="new">
      <va-button-dropdown
        class="color-dropdown__icon"
        preset="secondary"
        label="Colors"
        :offset="[16, 0]"
        prevent-overflow
        :close-on-content-click="false"
      >
        <div class="color-dropdown__content px-1">
          <div class="d-flex justify-center">
            <ThemeSwitch style="width: 100%;" />
          </div>

          <va-divider style="margin: 0.5rem -0.5rem;" />

          <div v-for="color in colorsArray" :key="color.name" class="color my-3 d-flex align-center">
            <va-color-indicator size="1.25rem" :color="color.name" /> <span class="color__title">{{ color.title }}</span>
          </div>
        </div>
      </va-button-dropdown>
    </va-badge>
  </div>
</template>

<script lang="ts">
import { useColors } from 'vuestic-ui/src/main'
import { colorsPresets } from 'vuestic-ui/src/services/color-config/color-theme-presets'
import { computed, defineComponent, ref } from 'vue'
import ThemeSwitch from '../../ThemeSwitch.vue'

export default defineComponent({
  name: 'DocsColorDropdown',

  components: { ThemeSwitch },

  setup () {
    const { applyPreset, presets, getColors } = useColors()
    const capitalizeFirstLetter = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

    const colorsArray = computed(() => {
      const colorNames = Object.keys(colorsPresets.light)

      return colorNames.map((c) => ({ name: c, title: capitalizeFirstLetter(c) }))
    })

    const themes = Object.keys(presets.value).map((themeName) => ({ value: themeName, label: capitalizeFirstLetter(themeName) }))
    const currentTheme = ref(localStorage.getItem('vuestic-docs-theme') || 'light')

    const setTheme = (theme: string) => {
      localStorage.setItem('vuestic-docs-theme', theme)
      applyPreset(theme)
    }

    setTheme(localStorage.getItem('vuestic-docs-theme') || 'dark')

    return {
      themes,
      colorsArray,
      currentTheme,
      setTheme,
    }
  },
})
</script>

<style lang="scss">
@import "~vuestic-ui/src/styles/resources";

.color-dropdown {
  cursor: pointer;
  font-family: var(--va-font-family);

  .va-badge__text-wrapper {
    top: 50%;
    left: unset;
    right: 0;
    transform: translate(0, -50%);
  }

  &__icon {
    .va-button__content {
      font-weight: 600;
    }

    position: relative;
    display: flex;
    align-items: center;
    margin-right: 2rem;
  }

  &__content {
    border-radius: 0.5rem;
    padding: 0;
    font-weight: normal;

    .color {
      display: flex;
      align-items: center;

      &__title {
        display: inline-block;
        min-width: 4rem;
        margin-left: 0.5rem;
      }
    }
  }

  .va-dropdown__anchor {
    display: inline-block;
  }
}

.button-restore {
  display: flex;
  margin: 0.375rem auto;
}
</style>
