module.exports = {
  importStrings: [
    "import { createVuestic } from 'vuestic-ui'",
  ],
  css: [
    'vuestic-ui/css',
  ],
  extendPackage: {
    dependencies: {
      'vuestic-ui': '^1.6.1',
    }
  },
  vueUse: [
    'createVuestic()'
  ]
}
