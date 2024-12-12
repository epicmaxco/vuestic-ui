import { type FormKitTypeDefinition } from '@formkit/core'
import { text } from './text'

export const password: FormKitTypeDefinition = {
  ...text,
  forceTypeProp: 'password'
}
