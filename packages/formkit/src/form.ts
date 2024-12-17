import { FormKitTypeDefinition } from '@formkit/core'
import { token } from '@formkit/utils'
import { VaForm, VaButton } from 'vuestic-ui'
import {
  messages,
  actions,
  createSection,
  forms,
  disablesChildren,
} from '@formkit/inputs'
import { submit } from './submit'


export const message = createSection('message', () => ({
  $el: 'li',
  for: ['message', '$messages'],
  attrs: {
    style: 'color: var(--va-danger)',
    key: '$message.key',
    id: `$id + '-' + $message.key`,
    'data-message-type': '$message.type',
  },
}))

export const formInput = createSection('form', () => ({
  $cmp: 'VaForm',
  bind: '$attrs',
  meta: {
    autoAnimate: true,
  },
  props: {
    id: '$id',
    name: '$node.name',
    onSubmit: '$handlers.submit',
    'data-loading': '$state.loading || undefined',
  },
}))

export const submitInput = createSection('submit', () => ({
  $cmp: 'FormKit',
  bind: '$submitAttrs',
  props: {
    type: submit,
  },
  children: "$submitLabel || Submit"
}))

/**
 * Input definition for a form.
 * @public
 */
export const form: FormKitTypeDefinition = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: formInput(
    '$slots.default',
    messages(message('$message.value')),
    actions(submitInput())
  ),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: 'group',
  /**
   * An array of extra props to accept for this input.
   */
  props: [
    'actions',
    'submit',
    'submitLabel',
    'submitAttrs',
    'submitBehavior',
    'incompleteMessage',
  ],

  library: {
    'VaForm': VaForm,
    'VaButton': VaButton
  },
  /**
   * Additional features that should be added to your input
   */
  features: [forms, disablesChildren],
  /**
   * The key used to memoize the schema.
   */
  schemaMemoKey: token(),
}
