/*       */

import { addProp } from 'compiler/helpers'

export default function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', `_s(${dir.value})`, dir)
  }
}
