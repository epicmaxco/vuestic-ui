module.exports = {
  importStrings: (answers) => {
    const strings = [
      "import { VuesticPluginsWithoutComponents } from 'vuestic-ui'",
      "import 'vuestic-ui/dist/styles/essentials.css'",
    ]

    if (answers.treeshakingOptions.includes('grid')) {
      strings.push("import 'vuestic-ui/dist/styles/grid/grid.scss'")
    }

    if (answers.treeshakingOptions.includes('normalize')) {
      strings.push("import 'vuestic-ui/dist/styles/global/normalize.scss'")
    }

    if (answers.treeshakingOptions.includes('typography')) {
      strings.push("import 'vuestic-ui/dist/styles/global/typography.scss'")
    }

    return strings
  },
  vueUse: [
    'VuesticPluginsWithoutComponents',
  ]
}