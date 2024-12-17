import { type FormKitTypeDefinition } from '@formkit/core'
import { token } from '@formkit/utils'
import { text } from './text'

export const url: FormKitTypeDefinition = {
  ...text,
  forceTypeProp: 'url',
  schemaMemoKey: token(),
}

