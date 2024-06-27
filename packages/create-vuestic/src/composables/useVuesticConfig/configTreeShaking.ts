import { Config } from "./types"

export default {
  import: [
    "import { createVuesticEssential, VaButton, VaIcon, VaCard, VaCardTitle, VaCardContent } from 'vuestic-ui'"
  ],
  css: (answers) => {
    const strings = [
      'vuestic-ui/styles/essential.css',
    ]

    if (answers.treeShaking.includes('grid') && !answers.vuesticFeatures.includes('tailwind')) {
      strings.push('vuestic-ui/styles/grid.css')
    }

    if (answers.treeShaking.includes('normalize') && !answers.vuesticFeatures.includes('tailwind')) {
      strings.push('vuestic-ui/styles/reset.css')
    }

    if (answers.treeShaking.includes('typography')) {
      strings.push('vuestic-ui/styles/typography.css')
    }

    return strings
  },
  plugin: 'createVuesticEssential({ components: { VaButton, VaIcon, VaCard, VaCardTitle, VaCardContent } })',
} as Config
