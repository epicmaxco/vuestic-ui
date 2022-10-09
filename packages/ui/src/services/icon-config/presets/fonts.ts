import { IconConfig } from './../types'

export const VuesticIconFonts: IconConfig = [
  {
    name: 'mi-{icon}',
    class: 'material-icons',
    resolve: ({ icon }) => ({ content: icon }),
  },
  // Fallback
  {
    name: '{icon}',
    class: 'material-icons',
    resolve: ({ icon }) => ({ content: icon }),
  },
]
