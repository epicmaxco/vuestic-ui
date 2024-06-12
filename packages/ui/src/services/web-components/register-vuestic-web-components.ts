import * as vuesticComponents from '../vue-plugin/components'
import { registerVuesticWebComponentsEssential } from './register-vuestic-web-components-essential'

const defaultCSS = `
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
}`

/**
 * Register vuestic components as Custom Elements
 *
 * @see https://vuestic.dev/getting-started/web-components
 */
export const registerVuesticWebComponents = (options: {
  /**
   * In case you need pass some css to shadow-dom of Custom Element
   *
   * @example
   * For Material Icons support inside Custom Element we need to pass `.material-icons` class.
   *
   * @default
   * We do this by default, so you don't need to copy paste it. In case you want to use different icon
   * font, then you need to provide class manually.
   * Notice: we don't need to pass font, but only style. Fonts are inherited from actual DOM.
```css
  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
}
```
   */
  css?: string,
} = {}) => {
  const { css = defaultCSS } = options

  registerVuesticWebComponentsEssential({
    css,
    components: vuesticComponents,
  })
}
