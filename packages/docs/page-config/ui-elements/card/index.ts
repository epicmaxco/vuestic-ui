import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Card"),
    block.paragraph("The `va-card` is a multipurpose representative component that can be used for anything from links to articles. It has some helper components to make markup easier."),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Default",
      description: "This is default `va-card` implementation using `va-card-title`, `va-card-content` and `va-card-actions` helper components."
    }),
    block.example("ColorAndGradient", { title: "Color and gradient" }),
    block.example("Tag", {
      title: "Tag",
      description: "Changed tag to `<b>`"
    }),
    block.example("BorderAndShape", { title: "Border, shadow and shape" }),
    block.example("Disabled", { title: "Disabled" }),
    block.example("Link", { title: "Card as link" }),
    block.example("Stripe", { title: "Stripe" }),
    block.example("Image", { title: "Image" }),
    block.example("Horizontal", { title: "Horizontal" }),

    block.headline("Actions", ),
    block.paragraph("The `VaCardActions` component is designed to apply margins and alignment to content (`VaButtons` expected)."),
    block.paragraph("Two properties can be passed: `align` (**string**, specify how to align actions) and `vertical` (**boolean**, display actions one below the other)."),
    block.paragraph("Valid values for `align`: left, center, right, between, around, stretch."),
    block.example("Actions", { hideTitle: true }),

    block.subtitle("API"),
    block.api("VaCard", apiDescription, apiOptions),

    block.subtitle("FAQ"),
    block.headline("Can I use `va-card` without helper components?"),
    block.paragraph("Yes, if you don't like our styling preset, you are free to use your own."),

    block.headline("Should I manually set tag if I use link attributes?"),
    block.paragraph("No, we will do it for you. If tag is not set, but `href` is, component tag will be `<a>`, if any of router-link prop is set, it will be `<router-link>`."),
  ],
});
