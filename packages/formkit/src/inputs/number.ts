import { type FormKitTypeDefinition } from '@formkit/core'
import { token } from '@formkit/utils'
import { text } from './text'

/**
 * Input definition for a number.
 * @public
 */
export const number: FormKitTypeDefinition = {
  ...text,
  forceTypeProp: 'number',
  schemaMemoKey: token(),
}
