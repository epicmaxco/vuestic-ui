import { type FormKitTypeDefinition } from '@formkit/core'
import { token } from '@formkit/utils'
import { text } from './text'

/**
 * Input definition for a month.
 * @public
 */
export const month: FormKitTypeDefinition = {
  ...text,
  forceTypeProp: 'month',
  schemaMemoKey: token(),
}
