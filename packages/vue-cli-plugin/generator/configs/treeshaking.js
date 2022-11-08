module.exports = {
  importStrings: [
    "import { createVuesticEssential, VaButton } from 'vuestic-ui'"
  ],
  css: (answers) => {
    const strings = [
      'vuestic-ui/styles/essential.css',
    ]

    if (answers.treeshakingOptions.includes('grid')) {
      strings.push('vuestic-ui/styles/grid.css')
    }

    if (answers.treeshakingOptions.includes('normalize')) {
      strings.push('vuestic-ui/styles/reset.css')
    }

    if (answers.treeshakingOptions.includes('typography')) {
      strings.push('vuestic-ui/styles/typography.css')
    }

    return strings
  },
  vueUse: [
    'createVuesticEssential({ components: { VaButton } })',
  ]
}