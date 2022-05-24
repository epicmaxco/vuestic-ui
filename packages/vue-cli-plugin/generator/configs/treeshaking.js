module.exports = {
  importStrings: (answers) => {
    const strings = [
      "import { createVuesticEssential, VaButton } from 'vuestic-ui'",
      "import 'vuestic-ui/css'",
      // "import 'vuestic-ui/styles/essential.css'",
    ]

    // TODO: Move back when CSS code split will work good
    // if (answers.treeshakingOptions.includes('grid')) {
    //   strings.push("import 'vuestic-ui/styles/grid/grid.css'")
    // }

    // if (answers.treeshakingOptions.includes('normalize')) {
    //   strings.push("import 'vuestic-ui/styles/global/normalize.css'")
    // }

    // if (answers.treeshakingOptions.includes('typography')) {
    //   strings.push("import 'vuestic-ui/styles/global/typography.css'")
    // }

    return strings
  },
  vueUse: [
    'createVuesticEssential({ components: { VaButton } })',
  ]
}