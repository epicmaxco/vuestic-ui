import { type FormKitTypeDefinition } from '@formkit/core'
import { token } from '@formkit/utils'
import { text } from './text'

/**
 * Input definition for a email.
 * @public
 */
export const email: FormKitTypeDefinition = {
  ...text,
  forceTypeProp: 'email',
  schemaMemoKey: token(),
}
