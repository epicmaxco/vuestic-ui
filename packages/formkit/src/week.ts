import { type FormKitTypeDefinition } from '@formkit/core'
import { token } from '@formkit/utils'
import { text } from './text'

/**
 * Input definition for a week.
 * @public
 */
export const week: FormKitTypeDefinition = {
  ...text,
  forceTypeProp: 'week',
  schemaMemoKey: token(),
}
