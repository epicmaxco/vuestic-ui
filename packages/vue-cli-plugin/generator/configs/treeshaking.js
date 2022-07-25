module.exports = {
  importStrings: (answers) => {
    const strings = [
      "import { createVuesticEssential, VaButton } from 'vuestic-ui'",
      "import 'vuestic-ui/styles/essential.css'",
    ]

    if (answers.treeshakingOptions.includes('grid')) {
      strings.push("import 'vuestic-ui/styles/grid.css'")
    }

    if (answers.treeshakingOptions.includes('normalize')) {
      strings.push("import 'vuestic-ui/styles/reset.css'")
    }

    if (answers.treeshakingOptions.includes('typography')) {
      strings.push("import 'vuestic-ui/styles/typography.css'")
    }

    return strings
  },
  vueUse: [
    'createVuesticEssential({ components: { VaButton } })',
  ]
}