import vaBreadcrumbsApiOptions from "./va-breadcrumbs-api-options";
import vaBreadcrumbsItemApiOptions from "./va-breadcrumbs-item-api-options";

export default definePageConfig({
  blocks: [
    block.title("breadcrumbs.title"),
    block.paragraph("breadcrumbs.text"),

    block.subtitle("Examples"),
    block.example("Default"),
    block.example("Align"),
    block.example("Separator"),
    block.example("Color"),
    block.example("ActiveColor"),
    block.example("Item"),

    block.subtitle("API"),
    block.api("VaBreadcrumbs", vaBreadcrumbsApiOptions),

    block.subtitle("breadcrumbs.api.item.title"),
    block.paragraph("breadcrumbs.api.item.text"),
    block.api("VaBreadcrumbsItem", vaBreadcrumbsItemApiOptions),

    block.subtitle("FAQ"),
    block.headline("breadcrumbs.faq.questions[0].question"),
    block.paragraph("breadcrumbs.faq.questions[0].answer"),
  ],
});
