import { IconConfig } from './../types'

export const VuesticIconFonts: IconConfig = [
  {
    name: '{icon}',
    class: 'material-icons',
    resolve: ({ icon }) => ({ content: icon }),
  },
]
