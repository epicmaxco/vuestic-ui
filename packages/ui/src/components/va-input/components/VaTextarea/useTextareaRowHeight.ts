import { ref, Ref } from 'vue'

const HIDDEN_TEXTAREA_STYLE = `
  min-height:0 !important;
  max-height:none !important;
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important';
`

const SIZING_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing',
]

const getNodeHeightStyles = (node: HTMLElement) => {
  const style = window.getComputedStyle(node)

  return {
    boxSizing:
      style.getPropertyValue('box-sizing') ||
      style.getPropertyValue('-moz-box-sizing') ||
      style.getPropertyValue('-webkit-box-sizing'),
    padding:
      parseFloat(style.getPropertyValue('padding-bottom')) +
      parseFloat(style.getPropertyValue('padding-top')),
    border:
      parseFloat(style.getPropertyValue('border-bottom-width')) +
      parseFloat(style.getPropertyValue('border-top-width')),
    styles:
      SIZING_STYLE.map(name => `${name}:${style.getPropertyValue(name)}`).join(';') + ';',
  }
}

// Cache for textarea document element
let textarea: null | HTMLTextAreaElement = null

const createHiddenTextarea = (original: HTMLTextAreaElement, styles: string) => {
  if (!textarea) {
    textarea = document.createElement('textarea')
  }

  textarea.setAttribute('style', styles + HIDDEN_TEXTAREA_STYLE)
  textarea.value = original.value || original.placeholder || ''

  const wrap = original.getAttribute('wrap')

  if (wrap !== null) {
    textarea.setAttribute('wrap', wrap)
  } else {
    textarea.removeAttribute('wrap')
  }

  return textarea
}

export const useTextareaRowHeight = (textarea: Ref<HTMLTextAreaElement | undefined>) => {
  const calculateRowHeight = () => {
    if (!textarea.value) { return 0 }

    const { boxSizing, padding, border, styles } = getNodeHeightStyles(textarea.value)

    const hiddenTextarea = createHiddenTextarea(textarea.value, styles)
    document.body.appendChild(hiddenTextarea)

    let height = hiddenTextarea.scrollHeight

    if (boxSizing === 'border-box') {
      height += border
    } else if (boxSizing === 'content-box') {
      height -= padding
    }

    document.body.removeChild(hiddenTextarea)

    return height
  }

  return {
    calculateRowHeight,
  }
}
