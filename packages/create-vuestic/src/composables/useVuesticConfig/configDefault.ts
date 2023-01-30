import { Config } from "./types"

export default  {
  import: [
    "import { createVuestic } from 'vuestic-ui'",
  ],
  css: [
    'vuestic-ui/css',
  ],
  plugin: 'createVuestic()'
}as Config
