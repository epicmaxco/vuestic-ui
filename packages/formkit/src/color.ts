import { type FormKitTypeDefinition } from '@formkit/core'
import { text } from './text'

export const color: FormKitTypeDefinition = {
  ...text,
  forceTypeProp: 'color'
}
