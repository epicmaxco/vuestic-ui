import { type FormKitTypeDefinition } from '@formkit/core'
import { token } from '@formkit/utils'
import { text } from './text'

/**
 * Input definition for a range.
 * @public
 */
export const range: FormKitTypeDefinition = {
  ...text,
  forceTypeProp: 'range',
  schemaMemoKey: token(),
}
