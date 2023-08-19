import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  head: {
    link: [
      { rel: 'dns-prefetch', as: 'script', href: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js' },
      { rel: 'dns-prefetch', as: 'script', href: 'https://kit.fontawesome.com/5460c87b2a.js' },
    ],

    script: [
      { crossorigin: 'anonymous', src: 'https://kit.fontawesome.com/5460c87b2a.js' },
      { type: 'module', src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js' },
    ],
  },

  blocks: [
    block.title("Icon"),
    block.paragraph("The `va-icon` component allows you to use different icon fonts. By default Vuestic UI provides [Material Design Icons](https://fonts.google.com/icons)[[target=_blank]]."),

    block.component("Playground"),

    block.link("Read more how you can use different icon libraries with Vuestic UI Icon Config", "services/icons-config"),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Default",
      "description": "Basic usage of the component with different icon fonts.",
      codesandboxConfig: {
        requireIcons: true,
      },
    }),
    block.alert("Notice that Vuestic UI uses only Material Icons by default. You need to manually install additional libraries.", "warning"),
    block.example("Color", {
      title: "Color",
      description: "Set different colors using the `color` prop. You can either use a theme string or the HEX color value."
    }),
    block.example("Size", {
      title: "Size",
      description: "Apply the `size` prop in order to make `va-icon` fit your needs."
    }),
    block.example("Rotation", {
      title: "Rotation and Flip",
      description: "It is used to rotate and mirror the `va-icon` component."
    }),
    block.example("Spin", {
      title: "Spin",
      description: "You can add animation of rotation of the icon using the property `spin`."
    }),
    block.example("Text", {
      title: "Text as icon",
      description: "Using `text` prop is used to cover the text icon style."
    }),
    block.example("Tag", {
      title: "Custom tag",
      description: "With the `tag` prop you can attach the icon to another tag."
    }),


    block.subtitle('Accessibility'),
    block.paragraph('The component completely ignored by screen readers because of [aria-hidden="true"](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden)[[target=_blank]] attribute.'),

    block.subtitle("API"),
    block.api("VaIcon", apiDescription, apiOptions),
  ],
});
