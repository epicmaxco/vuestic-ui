module.exports = {
  importStrings: [
    "import { createVuestic } from 'vuestic-ui'",
    "import 'vuestic-ui/css'",
  ],
  extendPackage: {
    dependencies: {
      'vuestic-ui': '^1.4.11',
    }
  },
  vueUse: [
    'createVuestic()'
  ]
}
