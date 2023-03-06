import {
  listApiOptions,
  listLabelApiOptions,
  listSeparatorApiOptions,
  listItemApiOptions,
  listItemLabelApiOptions,
  listItemSectionApiOptions,
} from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("list.title"),
    block.paragraph("list.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("Disabled"),
    block.example("Clickable"),
    block.example("Fit"),
    block.example("Lines"),

    block.subtitle("all.api"),

    block.paragraph("list.api.list.text"),
    block.api("VaList", listApiOptions),

    block.subtitle("list.api.listLabel.title"),
    block.paragraph("list.api.listLabel.text"),
    block.api("VaListLabel", listLabelApiOptions),

    block.subtitle("list.api.listSeparator.title"),
    block.paragraph("list.api.listSeparator.text"),
    block.api("VaListSeparator", listSeparatorApiOptions),

    block.subtitle("list.api.listItem.title"),
    block.paragraph("list.api.listItem.text"),
    block.api("VaListItem", listItemApiOptions),

    block.subtitle("list.api.listItemLabel.title"),
    block.paragraph("list.api.listItemLabel.text"),
    block.api("VaListItemLabel", listItemLabelApiOptions),

    block.subtitle("list.api.listItemSection.title"),
    block.paragraph("list.api.listItemSection.text"),
    block.api("VaListItemSection", listItemSectionApiOptions),
  ],
});
