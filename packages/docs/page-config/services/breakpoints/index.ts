const columnsHelpersTypes = [
  "name",
  { title: "type", type: "code" },
  { title: "description", type: "markdown" },
];

const tableDataHelpersTypes = [
  [
    "current",
    'string<"xs" | "sm" | "md" | "lg" | "xl">',
    "Current breakpoint name.",
  ],
  [
    "thresholds",
    'Record<"xs" | "sm" | "md" | "lg" | "xl", number>',
    "List of the current thresholds.",
  ],
  ["width", "number", "Current window width (`px`)."],
  ["height", "number", "Current window height (`px`)."],
  ["xs", "boolean", "`true` only for mentioned threshold."],
  ["sm", "boolean", "`true` only for mentioned threshold."],
  ["md", "boolean", "`true` only for mentioned threshold."],
  ["lg", "boolean", "`true` only for mentioned threshold."],
  ["xl", "boolean", "`true` only for mentioned threshold."],
  ["smUp", "boolean", "`true` for mentioned threshold and all above it."],
  ["mdUp", "boolean", "`true` for mentioned threshold and all above it."],
  ["lgUp", "boolean", "`true` for mentioned threshold and all above it."],
  ["smDown", "boolean", "`true` for mentioned threshold and all below it."],
  ["mdDown", "boolean", "`true` for mentioned threshold and all below it."],
  ["lgDown", "boolean", "`true` for mentioned threshold and all below it."],
];

export default definePageConfig({
  blocks: [
    block.title("Breakpoint Service"),
    block.paragraph("Vuestic UI provides breakpoint service that allows you to control every aspect of your application which depends on the window size."),
    block.example("Default", { hideTitle: true }),

    block.paragraph("We use the following breakpoints:"),
    block.paragraph("`.xs` - (< 640px) - Extra small devices"),
    block.paragraph("`.sm` - (>= 640px && < 1024px) - Small devices"),
    block.paragraph("`.md` - (>= 1024px && < 1440px) - Medium devices"),
    block.paragraph("`.lg` - (>= 1440px && < 1920px) - Large devices"),
    block.paragraph("`.xl` - (>= 1920) - Extra large devices"),

    block.subtitle("Helpers"),
    block.paragraph("Breakpoint service provides amount of helpers via `useBreakpoint` composable."),
    block.code("helpers"),
    block.paragraph("Helpers list:"),
    block.table(columnsHelpersTypes, tableDataHelpersTypes),

    block.subtitle("Threshold Class"),
    block.paragraph("Optional part of the service - reactive `body` class (`.va-screen-lg` for example) that allows you to build the following CSS constructions:"),
    block.code("body-class"),

    block.subtitle("Configuring"),
    block.paragraph("You can specify your own thresholds values, disable threshold class support or the whole service via Vuestic UI configuration object."),
    block.code("config"),
  ],
});
