import { type FormKitTypeDefinition } from '@formkit/core'
import { token } from '@formkit/utils'
import { text } from './text'

export const email: FormKitTypeDefinition = {
  ...text,
  forceTypeProp: 'email',
  schemaMemoKey: token(),
}
