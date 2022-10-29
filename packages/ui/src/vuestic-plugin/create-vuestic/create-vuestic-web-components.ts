import kebabCase from 'lodash/kebabCase.js'
import { defineCustomElement, DefineComponent } from 'vue'

// TODO: Not sure, but we might add global config support here.
/** Register vuestic components as Custom Elements */
export const createVuesticWebComponents = (components: DefineComponent[], options: {
  /** In case you need pass some css to shadow-dom of Custom Element */
  css?: string,
  /**
   * In case you need to specify a different prefix of vuestic components.
   * @default 'va'
   */
  prefix?: string,
}) => {
  const { css, prefix } = options

  components.forEach((component) => {
    const customElement = defineCustomElement(component)
    if (css) { component.styles.push(css) }
    customElements.define(`${prefix || 'va'}-${kebabCase(component.name)}`, customElement)
  })
}
