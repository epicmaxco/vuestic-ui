import { token } from '@formkit/utils'
import { button } from './button'

/**
 * Input definition for a submit button.
 * @public
 */
export const submit = {
  ...button,
  forceTypeProp: 'submit',
  schemaMemoKey: token(),
}
