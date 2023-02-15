const columnsHelpersTypes = [
  "name",
  { title: "type", type: "code" },
  { title: "description", type: "markdown" },
];

const tableDataHelpersTypes = [
  [
    "current",
    'string<"xs" | "sm" | "md" | "lg" | "xl">',
    "breakpoints.helpers.list.current",
  ],
  [
    "thresholds",
    'Record<"xs" | "sm" | "md" | "lg" | "xl", number>',
    "breakpoints.helpers.list.thresholds",
  ],
  ["width", "number", "breakpoints.helpers.list.width"],
  ["height", "number", "breakpoints.helpers.list.height"],
  ["xs", "boolean", "breakpoints.helpers.list.exactThreshold"],
  ["sm", "boolean", "breakpoints.helpers.list.exactThreshold"],
  ["md", "boolean", "breakpoints.helpers.list.exactThreshold"],
  ["lg", "boolean", "breakpoints.helpers.list.exactThreshold"],
  ["xl", "boolean", "breakpoints.helpers.list.exactThreshold"],
  ["smUp", "boolean", "breakpoints.helpers.list.upHelper"],
  ["mdUp", "boolean", "breakpoints.helpers.list.upHelper"],
  ["lgUp", "boolean", "breakpoints.helpers.list.upHelper"],
  ["smDown", "boolean", "breakpoints.helpers.list.downHelper"],
  ["mdDown", "boolean", "breakpoints.helpers.list.downHelper"],
  ["lgDown", "boolean", "breakpoints.helpers.list.downHelper"],
];

export default definePageConfig({
  blocks: [
    block.title("breakpoints.title"),
    block.paragraph("breakpoints.about"),
    block.example("Default", { hideTitle: true }),

    block.paragraph("breakpoints.sizes.intro"),
    block.paragraph("breakpoints.sizes.xs"),
    block.paragraph("breakpoints.sizes.sm"),
    block.paragraph("breakpoints.sizes.md"),
    block.paragraph("breakpoints.sizes.lg"),
    block.paragraph("breakpoints.sizes.xl"),

    block.subtitle("breakpoints.helpers.title"),
    block.paragraph("breakpoints.helpers.about"),
    block.code("helpers"),
    block.paragraph("breakpoints.helpers.list.title"),
    block.table(columnsHelpersTypes, tableDataHelpersTypes),

    block.subtitle("breakpoints.class.title"),
    block.paragraph("breakpoints.class.about"),
    block.code("body-class"),

    block.subtitle("breakpoints.configuring.title"),
    block.paragraph("breakpoints.configuring.about"),
    block.code("config"),
  ],
});
