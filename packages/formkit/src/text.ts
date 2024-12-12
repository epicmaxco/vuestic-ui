import { type FormKitTypeDefinition } from '@formkit/core'
import { casts, createSection } from '@formkit/inputs'
import { VaInput } from 'vuestic-ui'
import { VaFormKitWrapper } from './components';
import { inputProps } from './features/inputProps';
import { vuesticInputs } from './features/vuesticInputs';

const textInput = createSection('input', () => ({
  $cmp: 'VaFormKitWrapper',
  bind: '$attrs',
  props: {
    ...inputProps,
    component: VaInput,
    type: '$type',
    disabled: '$disabled',
    name: '$node.name',
    'aria-describedby': '$describedBy',
    'aria-required': '$state.required || undefined',
    prefixIcon: '$prefixIcon',
    suffixIcon: '$suffixIcon'
  },
}))

/**
 * Input definition for a text.
 * @public
 */
export const text: FormKitTypeDefinition = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: textInput(),
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
    VaFormKitWrapper
  },
  /**
   * Forces node.props.type to be this explicit value.
   */
  forceTypeProp: 'text',
  /**
   * Additional features that should be added to your input
   */
  features: [casts, vuesticInputs],
  /**
   * The key used to memoize the schema.
   */
  schemaMemoKey: `${Math.random()}`,
}
