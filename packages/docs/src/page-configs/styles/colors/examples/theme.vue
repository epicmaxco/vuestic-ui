<template>
  <div>
    <p class="d-flex align--center">
      Background colors:
      <va-button-toggle v-model="theme" :options="themeOptions" class="ml-2" />
    </p>

    <p class="d-flex align--center">
      Primary color:
      <va-color-palette
        class="ml-2"
        v-model="primaryColor"
        :palette="primaryColorVariants"
      />
    </p>
  </div>
</template>

<script>
import { ref, watchEffect, computed } from 'vue'
import { useColors } from 'vuestic-ui/src/main'

const useTheme = () => {
  const { setColors } = useColors()

  const theme = ref(localStorage.getItem('vuestic-docs-theme')?.toLowerCase() || 'light')
  const themes = {
    light: {
      // Background
      backgroundPrimary: '#ffffff',
      backgroundTertiary: '#ffffff',
      backgroundSecondary: '#f4f8fa',
      form: '#babfc2',
    },
    dark: {
      // Background
      backgroundPrimary: '#0d1117',
      backgroundSecondary: '#0a0d12',
      backgroundTertiary: '#161b22',
      form: '#404954',
    },
  }

  watchEffect(() => {
    setColors(themes[theme.value])
  })

  return { theme, themes }
}

const usePrimaryColor = () => {
  const { getColor, setColors } = useColors()
  return computed({
    get () {
      return getColor('primary')
    },
    set (value) {
      setColors({ primary: value })
    },
  })
}

export default {
  setup () {
    const { theme, themes } = useTheme()

    const primaryColorVariants = ['#2c82e0', '#ef476f', '#ffd166', '#06d6a0', '#8338ec']

    const primaryColor = usePrimaryColor()

    return {
      theme,
      themeOptions: Object.keys(themes).map((themeName) => ({
        value: themeName,
        label: themeName,
      })),

      primaryColor,
      primaryColorVariants,
    }
  },
}
</script>
