import apiOptions from "./api-options";
import apiDescription from "./api-description";

export default definePageConfig({
  blocks: [
    block.title("Avatar"),
    block.paragraph("`va-avatar` component is typically used for user profile pictures. The component  helps you display it in different sizes consistently throughout your web application."),

    block.component("Playground"),

    block.subtitle("Examples"),

    block.example("Default", {
      title: 'By default `va-avatar` is displayed as a circle container.'
    }),

    block.example("WithImage", {
      title: 'With image',
      description: 'The `src` prop is used to add custom image to a component.'
    }),

    block.example("Fallback", {
      title: "Fallback",
      description: "You can set fallback image."
    }),

    block.example("GravatarIntegration", {
      title: "Integrate with Gravatar",
      description: "You can easily use Gravatar with `VaAvatar` component."
    }),

    block.example("WithIcon", {
      title: "With icon",
      description: "The `icon` prop is used to display icon inside an avatar."
    }),

    block.example("Color", {
      title: "Different colors",
      description: "The `color` prop is used to set the color of the component and `text-color` for its textual content."
    }),

    block.example("Size", {
      title: "Different sizes",
      description: "The `size` prop allows you to specify custom size for an avatar. By default, font size will be scaled depending on the value of the `size` prop. But you can use the `font-size` prop to force text size you need."
    }),

    block.example("Square", {
      title: "Square",
      description: "The `square` prop is used to change components form from round to square."
    }),

    block.example("Loading", {
      title: "Loading",
      description: "The `loading` prop sets a loading state for the component via spinner icon."
    }),

    block.example("WithBadge", {
      title: "With badge",
      description: "You may combine `va-avatar` with `va-badge`, for example, to output amount of the new notifications."
    }),

    block.example("Group", {
      title: "Grouped",
      description: "You can use `va-avatar-group` component to group avatars."
    }),

    block.example("Accessibility"),
    block.list([
      "When image used as source, provide its description to the `alt` prop.",
      "Use `title` attribute when icon name is passed.",
      "Use `aria-hidden=\"true\"` attribute, if associated text is quite descriptive.",
    ]),

    block.subtitle("API"),
    block.api("VaAvatar", apiDescription, apiOptions),
  ],
});
