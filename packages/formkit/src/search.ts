import { type FormKitTypeDefinition } from '@formkit/core'
import { text } from './text'

export const search: FormKitTypeDefinition = {
  ...text,
  forceTypeProp: 'search'
}
