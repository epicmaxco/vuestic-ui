import { type Preview, setup } from '@storybook/vue3'
import { createVuestic } from 'vuestic-ui'
import { plugin as formkitPlugin, defaultConfig as formkitConfig } from '@formkit/vue'
import * as inputs from '../src'
import 'vuestic-ui/css'
import 'vuestic-ui/styles/essential.css'
import 'vuestic-ui/styles/typography.css'
import './vuestic.css'
import './tailwind.css'

setup((app) => {
  app.use(createVuestic())
  app.use(formkitPlugin, formkitConfig({
    inputs
  }))
})

const preview: Preview = {}

export default preview
