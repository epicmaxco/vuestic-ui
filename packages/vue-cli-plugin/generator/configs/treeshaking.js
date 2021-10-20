module.exports = {
  importStrings: (answers) => {
    const strings = [
      "import { VuesticPluginsWithoutComponents } from 'vuestic-ui'",
      "import 'vuestic-ui/dist/styles/essentials.css'",
    ]

    if (answers.useGrid) {
      strings.push("import 'vuestic-ui/dist/styles/grid/grid.scss'")
    }

    if (answers.useNormalize) {
      strings.push("import 'vuestic-ui/dist/styles/global/normalize.scss'")
    }

    return strings
  },
  vueUse: [
    'VuesticPluginsWithoutComponents',
  ]
}