const installCommandObject = {
  npm: "npm install @vuestic/formkit",
  yarn: "yarn add @vuestic/formkit",
};


const setupCode = `
// main.*
import { createApp } from 'vue'
import App from './App.vue'

import { plugin, defaultConfig } from '@formkit/vue'
import * as inputs from '@vuestic/formkit'

createApp(App)
  .use(plugin, defaultConfig({ inputs }))
  .mount('#app')
`;

const dependencies = {
  "@vuestic/formkit": "latest",
  "vuestic-ui": "latest",
  "vue": "latest"
};

export default definePageConfig({
  blocks: [
    block.title("FormKit integration"),
    block.paragraph("If you need a powerful tool for building forms, we recommend using the [FormKit](https://formkit.com/getting-started/what-is-formkit)[[target=_blank]] form framework. Vuestic UI provides a ready-made style theme for this framework."),
    block.headline("FormKit installation"),
    block.paragraph("To start using FormKit, install the dependencies in your project."),
    block.code(installCommandObject, "bash"),
    block.paragraph("Then add the plugin to your main.* file"),
    block.code(setupCode, "js"),
    block.subtitle("Examples"),
    block.paragraph("Here are some implementation examples of what is possible with Vuestic and FormKit:"),
    block.example("BasicForm", {
      codesandboxConfig: { dependencies },
      title: "Basic Form",
    }),
    block.example("AdvancedForm", {
      codesandboxConfig: { dependencies },
      title: "Advanced Form",
      description: "[Here](https://ui.vuestic.dev/ui-elements/form#default-usage) you can find this example done using only Vuestic components."
    }),
    block.example("MultiStepForm", {
      codesandboxConfig: { dependencies },
      title: "Multi Step Form",
    }),
  ],
});
