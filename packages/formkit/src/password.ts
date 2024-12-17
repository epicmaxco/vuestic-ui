import { type FormKitTypeDefinition } from '@formkit/core'
import { token } from '@formkit/utils'
import { text } from './text'

export const password: FormKitTypeDefinition = {
  ...text,
  forceTypeProp: 'password',
  schemaMemoKey: token(),
}
