import { type FormKitTypeDefinition } from '@formkit/core'
import {
  outer,
  inner,
  wrapper,
  label,
  prefix,
  suffix,
  casts,
  createSection
} from '@formkit/inputs'
import { icon, messages, message, help } from './sections'


const colorInput = createSection('input', () => ({
  $cmp: 'VaColorInput',
  bind: '$attrs',
  props: {
    type: '$type',
    disabled: '$disabled',
    name: '$node.name',
    onChange: '$handlers.DOMInput',
    [`onUpdate:modelValue`]: '$handlers.DOMInput',
    onBlur: '$handlers.blur',
    modelValue: '$_value',
    id: '$id',
    'aria-describedby': '$describedBy',
    'aria-required': '$state.required || undefined',
  },
}))

/**
 * Input definition for a text.
 * @public
 */
export const color: FormKitTypeDefinition = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(
    wrapper(
      label('$label'),
      inner(
        icon('prefix', 'label'),
        prefix(),
        colorInput(),
        suffix(),
        icon('suffix')
      )
    ),
    help('$help'),
    messages(message('$message.value'))
  ),
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
   * Forces node.props.type to be this explicit value.
   */
  forceTypeProp: 'text',
  /**
   * Additional features that should be added to your input
   */
  features: [casts],
  /**
   * The key used to memoize the schema.
   */
  schemaMemoKey: `${Math.random()}`,
}
