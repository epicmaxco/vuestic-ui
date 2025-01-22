import { type FormKitTypeDefinition } from '@formkit/core'
import { createSection } from '@formkit/inputs'
import { token } from '@formkit/utils'
import { VaSwitch } from 'vuestic-ui'
import { vuesticInputs } from '../features/vuesticInputs'
import { createInputWrapper } from '../createInputWrapper'

const FormKitInputWrapper = createInputWrapper(VaSwitch)

const toggleInput = createSection('input', () => ({
  $cmp: 'FormKitInputWrapper',
  bind: '$attrs',
  props: {
    context: '$node.context',
    prefixIcon: '$prefixIcon',
    suffixIcon: '$suffixIcon'
  }
}))

/**
 * Input definition for a toggle.
 * @public
 */
export const toggle: FormKitTypeDefinition = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: toggleInput(),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: 'input',
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: 'text',
  /**
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * A library of components to provide to the internal input schema
   */
  library: {
    FormKitInputWrapper
  },
  /**
   * Additional features that should be added to your input
   */
  features: [vuesticInputs],
  /**
   * The key used to memoize the schema.
   */
  schemaMemoKey: token(),
}
