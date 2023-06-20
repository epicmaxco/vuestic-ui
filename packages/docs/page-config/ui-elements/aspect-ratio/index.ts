import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Aspect Ratio"),
    block.paragraph("The `va-aspect-ratio` is a wrapper, that may help you to view your block with the required width to height ratio."),

    block.subtitle("Examples"),

    block.example("Default", { title: "Default" }),

    block.example("WithOtherComponents", {
      title: "With other components",
      description: "You're able to combine the `va-aspect-ratio` components with others. By default it's already used in `va-image`, but also will be useful in, for example, `va-card`."
    }),

    block.subtitle("API"),
    block.api("VaAspectRatio", apiDescription, apiOptions),
  ]
});
