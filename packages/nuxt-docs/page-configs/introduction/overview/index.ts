import { definePageConfig } from "~~/types/page-config";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("overview.title"),
    block.paragraph("overview.description"),
    block.subtitle("overview.featuresOverview"),
    block.list([
      "overview.vueThreeCompatible",
      "overview.featureRich",
      "overview.configurable",
      "overview.responsive",
      "overview.translatable",
    ]),
  ],
});
