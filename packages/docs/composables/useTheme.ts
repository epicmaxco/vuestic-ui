export const useTheme = () => {
  const { applyPreset } = useColors()

  const setTheme = (theme?: string) => {
    if (theme === undefined) { return }
    applyPreset(theme)
  }

  return {
    setTheme
  }
}
