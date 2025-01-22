import { type FormKitTypeDefinition } from '@formkit/core'
import { token } from '@formkit/utils'
import { text } from './text'

/**
 * Input definition for a telephone.
 * @public
 */
export const tel: FormKitTypeDefinition = {
  ...text,
  forceTypeProp: 'tel',
  schemaMemoKey: token(),
}
