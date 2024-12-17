import { type FormKitTypeDefinition } from '@formkit/core'
import { token } from '@formkit/utils'
import { text } from './text'

/**
 * Input definition for a search.
 * @public
 */
export const search: FormKitTypeDefinition = {
  ...text,
  forceTypeProp: 'search',
  schemaMemoKey: token(),
}
