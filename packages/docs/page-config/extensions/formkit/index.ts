const installCommandObject = {
  npm: "npm install @vuestic/formkit",
  yarn: "yarn add @vuestic/formkit",
};


const setupCode = `
// main.*
import { createApp } from 'vue'
import App from './App.vue'

import { plugin, defaultConfig } from '@formkit/vue'

createApp(App).use(plugin, defaultConfig).use(createVuestic()).mount('#app')
`;

const dependencies = {
  "@vuestic/formkit": "latest",
};

export default definePageConfig({
  blocks: [
    block.title("FormKit integration"),
    block.paragraph("If you need a powerful tool for building forms, we recommend using the [FormKit](https://formkit.com/getting-started/what-is-formkit)[[target=_blank]] form framework. Vuestic UI provides a ready-made style theme for this framework."),
    block.paragraph("Here are some implementation examples of what is possible with Vuestic and FormKit:"),
    // TODO That's not on npm yet.
    // block.headline("FormKit installation"),
    // block.paragraph("To start using FormKit, install the dependencies in your project."),
    // block.code(installCommandObject, "bash"),
    // block.paragraph("Then add the plugin to your main.* file"),
    // block.code(setupCode, "js"),
    block.example("BasicForm", {
      codesandboxConfig: { dependencies },
      title: "Basic Form",
    }),
    block.example("MultiStepForm", {
      codesandboxConfig: { dependencies },
      title: "Multi Step Form",
    }),
  ],
});
