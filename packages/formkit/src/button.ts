import { FormKitTypeDefinition } from '@formkit/core'
import {
  outer,
  wrapper,
  help,
  messages,
  message,
  icon,
  prefix,
  suffix,
  createSection,
  buttonLabel,
  localize,
  ignores,
} from '@formkit/inputs'
import { VaButton } from 'vuestic-ui'

export const buttonInput = createSection('input', () => ({
  $cmp: 'VaButton',
  bind: '$attrs',
  props: {
    type: '$type',
    disabled: '$disabled',
    name: '$node.name',
    id: '$id',
  },
}))


/**
 * Input definition for a button.
 * @public
 */
export const button: FormKitTypeDefinition = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(
    messages(message('$message.value')),
    wrapper(
      buttonInput(
        icon('prefix'),
        prefix(),
        buttonLabel('$label || $ui.submit.value'),
        suffix(),
        icon('suffix')
      )
    ),
    help('$help')
  ),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: 'input',
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: 'button',
  /**
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * Forces node.props.type to be this explicit value.
   */
  forceTypeProp: 'button',

  library: {
    'VaButton': VaButton
  },
  /**
   * Additional features that should be added to your input
   */
  features: [localize('submit'), ignores],
}

export const submit = {
  ...button,
  forceTypeProp: 'submit',
}
