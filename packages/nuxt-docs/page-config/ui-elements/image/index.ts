

import apiOptions from './api-options'




export default definePageConfig({
  blocks: [
  block.title('image.title'),
  block.paragraph('image.summaryText'),

  block.subtitle('all.examples'),

  block.headline('image.examples.default.title'),
  block.example('Default'),

  block.example(    'Ratio',
  ),
  block.example(    'Contain',
  ),
  block.example(    'DefaultSlot',
  ),
  // TODO Disabled because loading doesn't work properly.
  // block.example(  //   'LoaderSlot',
  // ),
  block.example(    'ErrorSlot',
  ),

  block.subtitle('all.api'),
  block.api('VaImage', apiOptions),

  block.subtitle('all.cssVariables'),
  block.file('vuestic-ui/src/components/va-image/_variables.scss'),
]
})
