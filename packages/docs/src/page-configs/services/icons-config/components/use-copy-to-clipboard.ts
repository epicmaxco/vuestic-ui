import { useToast } from 'vuestic-ui/src/main'
import { getWindow } from 'vuestic-ui/src/utils/ssr-utils'

export const useCopyToClipboard = () => {
  const { init } = useToast()

  const copy = (text: string) => {
    try {
      getWindow()?.navigator.clipboard.writeText(text)
      init({
        color: 'success',
        message: 'Copied to clipboard',
      })
    } catch {
      init({
        color: 'danger',
        message: 'Copy to clipboard failed',
      })
    }
  }

  return copy
}
