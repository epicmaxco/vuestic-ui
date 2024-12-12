import { type FormKitTypeDefinition } from '@formkit/core'
import { text } from './text'

export const url: FormKitTypeDefinition = {
  ...text,
  forceTypeProp: 'url'
}

