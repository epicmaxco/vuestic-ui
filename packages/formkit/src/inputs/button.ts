import { FormKitTypeDefinition } from '@formkit/core'
import {
  outer,
  wrapper,
  prefix,
  suffix,
  createSection,
  buttonLabel,
  localize,
  ignores,
} from '@formkit/inputs'
import { token } from '@formkit/utils'
import { VaButton, VaMessageList, VaIcon } from 'vuestic-ui'
import { vuesticInputs } from '../features/vuesticInputs'
import { icon, messages, help } from '../sections'

export const buttonInput = createSection('input', () => ({
  $cmp: 'VaButton',
  bind: '$attrs',
  props: {
    type: '$type',
    disabled: '$disabled',
    name: '$node.name',
    id: '$id',
    loading: '$loading'
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
    messages(),
    wrapper(
      buttonInput(
        icon('prefix'),
        prefix(),
        buttonLabel('$label || $ui.submit.value'),
        suffix(),
        icon('suffix')
      )
    ),
    help()
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
    VaButton,
    VaMessageList,
    VaIcon
  },
  /**
   * Additional features that should be added to your input
   */
  features: [localize('submit'), ignores, vuesticInputs],

  /**
   * A key to use for memoizing the schema. This is used to prevent the schema
   * from needing to be stringified when performing a memo lookup.
   */
  schemaMemoKey: token(),
}
