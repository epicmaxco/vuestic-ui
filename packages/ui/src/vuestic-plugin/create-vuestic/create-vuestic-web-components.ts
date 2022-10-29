import { VuesticComponent } from './../types/index'
import kebabCase from 'lodash/kebabCase.js'
import { defineCustomElement, DefineComponent } from 'vue'

// TODO: Not sure, but we might add global config support here.
/** Register vuestic components as Custom Elements */
export const createVuesticWebComponents = (components: Record<string, VuesticComponent>, options: {
  /** In case you need pass some css to shadow-dom of Custom Element */
  css?: string,
} = {}) => {
  const { css } = options

  Object.entries(components).forEach(([name, component]) => {
    const customElement = defineCustomElement(component)
    if (css) { component.styles.push(css) }
    customElements.define(`${kebabCase(name)}`, customElement)
  })
}
