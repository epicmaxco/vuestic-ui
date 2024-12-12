import { type FormKitTypeDefinition } from '@formkit/core'
import { text } from './text'

export const tel: FormKitTypeDefinition = {
  ...text,
  forceTypeProp: 'tel'
}
