// const config: ApiDocsBlock[] = [
//   block.title('stepper.title'),
//   block.paragraph('stepper.description'),

//   block.subtitle('all.examples'),
//   ...block.exampleBlock(
//     'stepper.examples.default.title',
//     'stepper.examples.default.text',
//     'Default',
//   ),

//   ...block.exampleBlock(
//     'stepper.examples.vertical.title',
//     'stepper.examples.vertical.text',
//     'Vertical',
//   ),

//   ...block.exampleBlock(
//     'stepper.examples.icons.title',
//     'stepper.examples.icons.text',
//     'Icons',
//   ),

//   ...block.exampleBlock(
//     'stepper.examples.custom.title',
//     'stepper.examples.custom.text',
//     'Custom',
//   ),

//   block.alert('stepper.alerts.slots', 'info'),

//   ...block.exampleBlock(
//     'stepper.examples.minimal.title',
//     'stepper.examples.minimal.text',
//     'Minimal',
//   ),

//   block.subtitle('all.api'),
//   block.api('VaStepper', apiOptions),

//   block.subtitle('all.cssVariables'),
//   block.file('vuestic-ui/src/components/va-stepper/_variables.scss'),
// ]
import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title('stepper.title'),
    block.paragraph('stepper.description'),

    block.subtitle('all.examples'),

    block.example('Default'),

    block.example('Vertical'),

    block.example('Icons'),

    block.example('Custom'),

    block.alert('stepper.alerts.slots', 'info'),

    block.example('Minimal'),

    block.subtitle("all.api"),
    block.api("VaStepper", apiOptions),

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-stepper/_variables.scss"),
  ],
});
