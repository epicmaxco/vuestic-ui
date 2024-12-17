import { type FormKitTypeDefinition } from '@formkit/core'
import { token } from '@formkit/utils'
import { text } from './text'

export const date: FormKitTypeDefinition = {
  ...text,
  forceTypeProp: 'date',
  schemaMemoKey: token(),
}
