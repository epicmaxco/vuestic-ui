module.exports = {
  importStrings: [
    "import { createVuestic } from 'vuestic-ui'",
  ],
  css: [
    'vuestic-ui/css',
  ],
  extendPackage: {
    dependencies: {
      'vuestic-ui': '^1.9.11',
    }
  },
  vueUse: [
    'createVuestic()'
  ]
}
