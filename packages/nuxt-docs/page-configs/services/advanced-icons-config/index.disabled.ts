// not released yet

import { definePageConfig } from "~~/types/page-config";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("advancedIconsConfig.title"),
    block.paragraph("advancedIconsConfig.subtitle"),

    // TODO: Draw image example how works searching in flat array.

    // TODO: How to use Component and pass props to define own data-attrs or smth else
  ],
});
