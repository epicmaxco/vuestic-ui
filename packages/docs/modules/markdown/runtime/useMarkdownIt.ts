export const useMarkdownProvideKey = 'vuestic:markdown'

export const useMarkdownIt = () => {
  return inject(useMarkdownProvideKey)
}