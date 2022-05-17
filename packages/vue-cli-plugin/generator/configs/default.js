module.exports = {
  importStrings: [
    "import { VuesticPlugin } from 'vuestic-ui'",
    "import 'vuestic-ui/dist/vuestic-ui.css'",
  ],
  extendPackage: {
    dependencies: {
      'vuestic-ui': '^1.4.0',
    }
  },
  vueUse: [
    'VuesticPlugin'
  ]
}
