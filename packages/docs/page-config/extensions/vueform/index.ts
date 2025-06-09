const installCommandObject = {
  npm: "npm install @vuestic/vueform",
  yarn: "yarn add @vuestic/vueform",
}

const setupCode = `
// main.*
import { createApp } from 'vue'
import App from './App.vue'
import Vueform from '@vueform/vueform'
import vueformConfig from './../vueform.config'

createApp(App)
  .use(Vueform, vueformConfig)
  .mount('#app')
`
const configCode = `
import en from '@vueform/vueform/locales/en'
import vueform from '@vueform/vueform/dist/vueform'
import { defineConfig } from '@vueform/vueform'

// You might place these anywhere else in your project
import '@vueform/vueform/dist/vueform.css';
import '@vuestic/vueform/dist/vueform.css'
import * as elements from '@vuestic/vueform'

export default defineConfig({
    theme: vueform,
    locales: { en },
    locale: 'en',
    elements: [elements]
})
`
export default definePageConfig({
  blocks: [
    block.title("Vueform integration"),
    block.paragraph("[Vueform](https://vueform.com/)[[target=_blank]] is a comprehensive form framework for Vue that makes form development a breeze. With this integration library, you can easily use Vuestic components within Vueform."),

    block.headline("Vueform installation"),
    block.paragraph("To start using Vueform, install the dependencies in your project."),
    block.code(installCommandObject, "bash"),
    block.paragraph("Create a vueform.config.(js|ts) file in the root of your project."),
    block.code(configCode, "js"),
    block.paragraph("Then add the plugin to your main.* file"),
    block.code(setupCode, "js"),

    block.subtitle("Components"),
    block.paragraph('Currently, we support the following components: `VaInput`, `VaSelect`, `VaCheckbox`, `VaTextarea`, `VaDateInput`, `VaSlider`, `VaRadio`, `VaFileUpload`, `VaButton`, `VaCounter`, `VaRating`, `VaSwitch`, `VaTimeInput`. These components were selected because they represent the most commonly used interactive form elements in real-world applications. If you need support for a specific component, feel free to contribute or open a feature request.'),
    block.paragraph('Every component that we export, ends with `Element`, for example `VaInputElement` and it is necessary to provide prop `name`. See more in Examples.'),

    block.subtitle("Props"),
    block.paragraph('To avoid conflicts with Vueform, some props have been changed:'),
    block.list([
      'All elements omit `rules` prop',
      '`VaButtonElement` now has prop `submits` instead of `type`',
      '`VaDateInputElement` omits `isOpen` prop',
      '`VaFileUploadElement` `type` prop changed to `uploadType`',
      '`VaInputElement` `type` prop changed to `inputType`',
      '`VaRadioElement` omits `messages` prop',
      '`VaSelectElement` omits `isOpen`, `messages` and `search` prop',
    ]),

    block.subtitle("Examples"),
    block.paragraph("Here are some implementation examples of what is possible with Vuestic and Vueform:"),
    block.example("BasicForm", {
      title: "Basic Form",
    }),
    block.example("AdvancedForm", {
      title: "Advanced Form",
    }),
  ]
})
