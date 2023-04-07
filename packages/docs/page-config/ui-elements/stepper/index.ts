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

    block.subtitle('all.accessibility'),

    block.paragraph('stepper.accessibility'),

    block.subtitle("all.api"),
    block.api("VaStepper", apiOptions),
  ],
});
