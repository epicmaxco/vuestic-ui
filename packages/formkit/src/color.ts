import { type FormKitTypeDefinition } from '@formkit/core'
import { token } from '@formkit/utils'
import { text } from './text'

/**
 * Input definition for a color.
 * @public
 */
export const color: FormKitTypeDefinition = {
  ...text,
  forceTypeProp: 'color',
  schemaMemoKey: token(),
}
