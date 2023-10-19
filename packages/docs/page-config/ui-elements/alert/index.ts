import apiOptions from "./api-options";
import apiDescription from "./api-description";
export default definePageConfig({
  blocks: [
    block.title("Alert"),
    block.paragraph("Displays a short, important message to attract user attention. If you need to send a notification to users, you can use our [Toast](https://vuestic.dev/ui-elements/toast) component."),

    block.component('Playground'),

    block.subtitle("When To Use"),
    block.list([
      'When you need to show an important message to users.',
      'When you need a static container with some important information which is closable by user actions.',
    ]),

    block.subtitle("Examples"),
    block.example("Default", {
      title: 'Default',
      description: 'The basic usage of the `va-alert` component.'
    }),
    block.example("Styles", {
      title: 'Different styles',
      description: '3 styles are available: `color`, `outlined` and `border` styled alerts.',
    }),
    block.example("Color", {
      title: 'Color',
      description: 'Use `color` property to change the color of the component and `text-color` to change the textual content color.',
    }),
    block.example("Border", {
      title: "Border",
      description: "Use the `border` property to add a strip and the `border-color` property to change the color of the strip.",
    }),
    block.example("Dense", {
      title: "Dense",
      description: "The `dense` property reduces paddings on alert."
    }),
    block.example("Title", {
      title: "Title",
      description: "The `title` property allows you to write text over the description area. Use the `title` slot to customize the title area."
    }),
    block.example("Icon", {
      title: "Icon",
      description: "The `icon` property allows you to add an icon in front of the description area. Use the `icon` slot to customize the icon area."
    }),
    block.example("Closeable", {
      title: "Closeable",
      description: "The `closeable` property add a close alert area. Also you can pass `close-text` prop to make close icon as plain text."
    }),
    block.example("Center", {
      title: "Center",
      description: "The `center` property allows you to center title and description areas."
    }),

    block.subtitle("Accessibility"),
    block.paragraph("The component has a [alert](https://w3c.github.io/aria/#alert)[[target=_blank]] role. It's communicating an important message, and different from [alertdialog](https://w3c.github.io/aria/#alertdialog)[[target=_blank]] role, it doesn't interrupt the user's workflow."),

    block.subtitle("API"),
    block.api("VaAlert", apiDescription, apiOptions),
  ],
});
