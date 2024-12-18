import { type FormKitTypeDefinition } from '@formkit/core'
import { token } from '@formkit/utils'
import { text } from './text'

/**
 * Input definition for a datetime-local.
 * @public
 */
export const datetimeLocal: FormKitTypeDefinition = {
  ...text,
  forceTypeProp: 'datetime-local',
  schemaMemoKey: token(),
}
