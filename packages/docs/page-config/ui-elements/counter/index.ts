import { ApiDocsBlock } from "../../../types/configTypes";
import { PageGenerationHelper } from "../../../helpers/DocsHelper";

import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("counter.title"),
    block.paragraph("counter.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("Style"),
    block.example("Buttons"),
    block.example("Width"),
    block.example("ButtonsStyle"),
    block.example("IconsColors"),
    block.example("State"),
    block.example("MaxMinStep"),
    block.example("Slots"),

    block.subtitle("all.api"),
    block.api("VaCounter", apiOptions),

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-counter/_variables.scss"),
  ],
});
