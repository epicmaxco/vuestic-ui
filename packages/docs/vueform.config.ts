import en from '@vueform/vueform/locales/en'
import vueform from '@vueform/vueform/dist/vueform'
import { defineConfig } from '@vueform/vueform'
import '@vueform/vueform/dist/vueform.css';
import * as elements from '@vuestic/vueform'

export default defineConfig({
  theme: vueform,
  locales: { en },
  locale: 'en',
  elements: [elements]
})
