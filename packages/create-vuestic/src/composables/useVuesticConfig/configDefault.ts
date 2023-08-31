import { Config } from "./types"

export default  {
  import: [
    "import { createVuestic } from 'vuestic-ui'",
  ],
  css: (answers) => {
    if (answers.vuesticFeatures.includes('tailwind')) {
      return [
        'vuestic-ui/styles/essential.css',
        'vuestic-ui/styles/typography.css'
      ]
    }

    return [
      'vuestic-ui/css',
    ]
  },
  plugin: 'createVuestic()'
}as Config
