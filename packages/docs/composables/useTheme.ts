export const useTheme = () => {
  const colorMode = useColorMode()
  const cookie = useCookie('vuestic-theme')

  const { applyPreset } = useColors()

  const setTheme = (theme?: string) => {
    if (theme) {
      colorMode.preference = theme
      applyPreset(theme)
      cookie.value = theme
      return
    }

    if (cookie.value) {
      applyPreset(cookie.value)
      return
    }

    if (!colorMode.unknown) {
      applyPreset(colorMode.value)
    }
  }

  return {
    setTheme
  }
}
