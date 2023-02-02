export const useTheme = () => {
  const colorMode = useColorMode()

  const { applyPreset } = useColors()

  const setTheme = (theme?: string) => {
    if (theme) {
      colorMode.preference = theme
      applyPreset(theme)
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
