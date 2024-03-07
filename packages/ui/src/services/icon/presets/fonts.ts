import { IconConfig } from '../types'

export const VuesticIconFonts: IconConfig = [
  {
    name: 'mi-{icon}',
    class: 'material-symbols-outlined',
    resolve: ({ icon }) => ({ content: icon }),
  },
  // Fallback
  {
    name: '{icon}',
    class: 'material-symbols-outlined',
    resolve: ({ icon }) => ({ content: icon }),
  },
]
