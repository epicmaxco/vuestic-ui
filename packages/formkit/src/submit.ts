import { token } from '@formkit/utils'
import { button } from "./button";

export const submit = {
  ...button,
  forceTypeProp: 'submit',
  schemaMemoKey: token(),
}
