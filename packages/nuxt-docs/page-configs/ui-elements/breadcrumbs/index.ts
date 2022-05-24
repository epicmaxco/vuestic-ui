import { definePageConfig } from "~~/types/page-config";
import VaBreadcrumbs from "vuestic-ui/src/components/va-breadcrumbs/VaBreadcrumbs.vue";
import VaBreadcrumbsItem from "vuestic-ui/src/components/va-breadcrumbs/VaBreadcrumbsItem/VaBreadcrumbsItem.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("breadcrumbs.title"),
    block.paragraph("breadcrumbs.text"),

    block.subtitle("all.examples"),
    block.exampleBlock("Default"),
    block.exampleBlock("Align"),
    block.exampleBlock("Separator"),
    block.exampleBlock("Color"),
    block.exampleBlock("ActiveColor"),
    block.exampleBlock("Item"),

    block.subtitle("all.api"),
    block.api(VaBreadcrumbs),

    block.subtitle("breadcrumbs.api.item.title"),
    block.paragraph("breadcrumbs.api.item.text"),
    block.api(VaBreadcrumbsItem),

    block.subtitle("all.faq"),
    block.subtitle("breadcrumbs.faq.questions[0].question", 'h5'),
    block.paragraph("breadcrumbs.faq.questions[0].answer"),
  ],
  manualApi: {
    slots: {
      default: {},
      separator: {},
    },
  },
});
