import { type Preview, setup } from '@storybook/vue3'
import { createVuestic } from 'vuestic-ui'
import { defineConfig } from '@vueform/vueform'
import vueform from '@vueform/vueform/dist/vueform'
import en from '@vueform/vueform/locales/en'
import VaSelectElement from '../src/components/VaSelectElement.vue'
import VaCheckboxElement from '../src/components/VaCheckboxElement.vue'
import VaInputElement from '../src/components/VaInputElement.vue'
import VaTextareaElement from '../src/components/VaTextareaElement.vue'
import VaDateInputElement from '../src/components/VaDateInputElement.vue'
import VaSliderElement from '../src/components/VaSliderElement.vue'
import VaRadioElement from '../src/components/VaRadioElement.vue'
import VaSwitchElement from '../src/components/VaSwitchElement.vue'
import VaFileUploadElement from '../src/components/VaFileUploadElement.vue'
import VaButtonElement from '../src/components/VaButtonElement.vue'
import VaRatingElement from '../src/components/VaRatingElement.vue'
import VaCounterElement from '../src/components/VaCounterElement.vue'
import VaTimeInputElement from '../src/components/VaTimeInputElement.vue'

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
      VaDateInputElement,
      VaSliderElement,
      VaRadioElement,
      VaSwitchElement,
      VaFileUploadElement,
      VaButtonElement,
      VaRatingElement,
      VaCounterElement,
      VaTimeInputElement
    ]
  }))
})

const preview: Preview = {}

export default preview
