import { type FormKitTypeDefinition } from '@formkit/core'
import { token } from '@formkit/utils'
import { text } from './text'

/**
 * Input definition for a date.
 * @public
 */
export const date: FormKitTypeDefinition = {
  ...text,
  forceTypeProp: 'date',
  schemaMemoKey: token(),
}
