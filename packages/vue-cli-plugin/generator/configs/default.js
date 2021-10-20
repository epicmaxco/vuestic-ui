module.exports = {
  importStrings: [
    "import { VuesticPlugin } from 'vuestic-ui'",
    "import 'vuestic-ui/dist/vuestic-ui.css'",
  ],
  templatePath: './template',
  extendPackage: {
    dependencies: {
      'vuestic-ui': '^1.2.0',
    }
  },
  vueUse: [
    'VuesticPlugin'
  ]
}