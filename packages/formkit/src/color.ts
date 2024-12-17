import { type FormKitTypeDefinition } from '@formkit/core'
import { token } from '@formkit/utils'
import { text } from './text'

export const color: FormKitTypeDefinition = {
  ...text,
  forceTypeProp: 'color',
  schemaMemoKey: token(),
}
