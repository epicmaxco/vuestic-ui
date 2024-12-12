import { type FormKitTypeDefinition } from '@formkit/core'
import { text } from './text'

export const email: FormKitTypeDefinition = {
  ...text,
  forceTypeProp: 'email'
}
