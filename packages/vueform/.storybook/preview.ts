import { type Preview, setup } from '@storybook/vue3'
import { createVuestic } from 'vuestic-ui'
import { defineConfig } from '@vueform/vueform'
import vueform from '@vueform/vueform/dist/vueform'
import en from '@vueform/vueform/locales/en'
import VaSelectElement from '../src/components/VaSelectElement.vue'
import VaCheckboxElement from '../src/components/VaCheckboxElement.vue'
import VaInputElement from '../src/components/VaInputElement.vue'
import VaTextareaElement from '../src/components/VaTextareaElement.vue'

import Vueform from '@vueform/vueform'
import 'vuestic-ui/css'
import 'vuestic-ui/styles/essential.css'
import 'vuestic-ui/styles/typography.css'
import './vuestic.css'
import './tailwind.css'
import '@vueform/vueform/dist/vueform.css';

setup((app) => {
  app.use(createVuestic())
  app.use(Vueform, defineConfig({
    theme: vueform,
    locales: { en },
    locale: 'en',
    elements: [
      VaCheckboxElement,
      VaSelectElement,
      VaInputElement,
      VaTextareaElement,
    ]
  }))
})

const preview: Preview = {}

export default preview
