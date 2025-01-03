import { type FormKitTypeDefinition } from '@formkit/core'
import { token } from '@formkit/utils'
import { text } from './text'

/**
 * Input definition for a url.
 * @public
 */
export const url: FormKitTypeDefinition = {
  ...text,
  forceTypeProp: 'url',
  schemaMemoKey: token(),
}

