import { VuesticComponent } from './../types/index'
import kebabCase from 'lodash/kebabCase.js'
import { defineCustomElement } from 'vue'

// TODO: Not sure, but we might add global config support here.
/** Register vuestic components as Custom Elements */
export const createVuesticWebComponents = (options: {
  /**
   * In case you need pass some css to shadow-dom of Custom Element
   *
   * @example
   * For Material Icons support inside Custom Element we need to pass `.material-icons` class.
   * Notice: we don't need to pass font, but only style. Fonts are inherited from actual DOM.
```css
  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
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

  /**
   * Vuestic Component that must be registered as Custom Elements.
   *
   * **Make sure to make all imports from `vuestic-ui/web-components`**.
   */
  components: Record<string, VuesticComponent>
}) => {
  const { css, components } = options

  Object.entries(components).forEach(([name, component]) => {
    const customElement = defineCustomElement(component as any)
    if (css && 'styles' in component) { component.styles.push(css) }
    customElements.define(`${kebabCase(name)}`, customElement)
  })
}
