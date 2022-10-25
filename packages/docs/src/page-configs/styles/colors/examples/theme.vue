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
  const { presets, applyPreset } = useColors()

  const theme = ref(localStorage.getItem('vuestic-docs-theme')?.toLowerCase() || 'light')

  watchEffect(() => {
    applyPreset(theme.value)
  })

  return { theme, presets }
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
    const { theme, presets } = useTheme()

    const primaryColorVariants = ['#2c82e0', '#ef476f', '#ffd166', '#06d6a0', '#8338ec']

    const primaryColor = usePrimaryColor()

    return {
      theme,
      themeOptions: Object.keys(presets.value).map((themeName) => ({
        value: themeName,
        label: themeName,
      })),

      primaryColor,
      primaryColorVariants,
    }
  },
}
</script>
