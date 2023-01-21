import {
  codeForCodeblock,
  codeForListBlock,
  linkOptionsBlock,
  tableDataBlock,
} from "./code/blocks";

export const columns = [
  "col1",
  { title: "col2", type: "strong" },
  { title: "col3", type: "markdown" },
  { title: "col4", type: "code" },
];

export const tableData = [
  [
    "d1C1",
    "d1C2",
    "[d1C3](https://en.wikipedia.org/wiki/Markdown)[[target=_blank]]",
    "d1C4",
  ],
  ["d2C1", "d2C2", "<mark>d2C3</mark>", "d2C4"],
  ["d3C1", "d3C2", "~~d3C3~~", "d3C4"],
];

export default definePageConfig({
  blocks: [
    block.title("documentationPage.title"),
    block.paragraph("documentationPage.description"),

    block.subtitle("documentationPage.introduction.title"),
    block.paragraph("documentationPage.introduction.description"),

    // Page Config
    block.subtitle("documentationPage.pageConfig.title"),
    block.paragraph("documentationPage.pageConfig.descriptionStructure"),
    block.fileStructure([
      {
        name: "code-examples",
        children: [
          {
            name: "[code-examples].ts",
          },
          {
            name: "index.ts",
            description: "Must re-export all code examples using named exports",
          },
        ],
      },
      {
        name: "examples",
        description: "Folder where docs examples must be stored",
        children: [
          {
            name: "[example].vue",
            description:
              "Example vue component. Better to have it in Options API with Js. Keep it small. Examples code will be visible to user.",
          },
        ],
      },
      {
        name: "components",
        description:
          "If you have complex docs page and need a bit of interactivity.",
        children: [
          {
            name: "[component].vue",
            description: "Component code will not be shown to user.",
          },
        ],
      },
      {
        name: "api-options.ts",
        description:
          "Api options for this component at the bottom of component page",
      },
      {
        name: "page-config.ts",
        description: "Entry file where docs page defined",
      },
    ]),
    block.paragraph("documentationPage.pageConfig.descriptionFile"),

    // Generators
    block.subtitle("documentationPage.generators.title"),
    block.paragraph("documentationPage.generators.description"),
    block.paragraph("documentationPage.generators.generateDocsPage"),
    block.paragraph("documentationPage.generators.generateComponent"),

    // BlockTypes
    block.subtitle("documentationPage.blocktypes.title"),

    block.headline("documentationPage.blocktypes.titleBlock.title"),
    block.paragraph("documentationPage.blocktypes.titleBlock.text"),
    block.code("block.title('translation.path')"),
    block.paragraph("documentationPage.compilesTo"),
    block.title("documentationPage.blocktypes.titleBlock.example"),

    block.headline("documentationPage.blocktypes.subtitle.title"),
    block.paragraph("documentationPage.blocktypes.subtitle.text"),
    block.code("block.subtitle('translation.path')"),
    block.paragraph("documentationPage.compilesTo"),
    block.subtitle("documentationPage.blocktypes.subtitle.example"),

    block.headline("documentationPage.blocktypes.headline.title"),
    block.paragraph("documentationPage.blocktypes.headline.text"),
    block.code("block.headline('translation.path')"),
    block.paragraph("documentationPage.compilesTo"),
    block.headline("documentationPage.blocktypes.headline.example"),

    block.headline("documentationPage.blocktypes.paragraph.title"),
    block.paragraph("documentationPage.blocktypes.paragraph.text"),
    block.code("block.paragraph('translation.path')"),
    block.paragraph("documentationPage.compilesTo"),
    block.paragraph("documentationPage.blocktypes.paragraph.example"),

    block.headline("documentationPage.blocktypes.list.title"),
    block.paragraph("documentationPage.blocktypes.list.text"),
    block.code("block.list(['translation1.path', 'translation2.path'])"),
    block.paragraph("documentationPage.compilesTo"),
    block.list([
      "documentationPage.blocktypes.list.listExample1",
      "documentationPage.blocktypes.list.listExample2",
    ]),
    block.paragraph("documentationPage.blocktypes.list.inCode"),
    block.code("list"),

    block.headline("documentationPage.blocktypes.code.title"),
    block.paragraph("documentationPage.blocktypes.code.text"),
    block.code("block"),
    block.paragraph("documentationPage.compilesTo"),
    block.code("<div>Code string</div>"),

    block.headline("documentationPage.blocktypes.example.title"),
    block.paragraph("documentationPage.blocktypes.example.text"),
    block.code("block.example('ComponentName')"),

    block.headline("documentationPage.blocktypes.component.title"),
    block.paragraph("documentationPage.blocktypes.component.text"),
    block.code("block.component('ComponentName')"),

    block.headline("documentationPage.blocktypes.api.title"),
    block.paragraph("documentationPage.blocktypes.api.text"),
    block.code("block.api(VaComponent, apiOptions)"),

    block.headline("documentationPage.apiOptionsTitle"),
    block.paragraph("documentationPage.apiOptions.text"),
    block.paragraph("documentationPage.apiOptions.hidden"),
    block.paragraph("documentationPage.apiOptions.types"),
    block.paragraph("documentationPage.apiOptions.version"),
    block.code("api-options"),

    block.headline("documentationPage.blocktypes.table.title"),
    block.paragraph("documentationPage.blocktypes.table.text"),
    block.code("tabledata"),
    block.code("block.table(columns, tableData)"),
    block.paragraph("documentationPage.compilesTo"),
    block.table(columns, tableData),

    block.headline("documentationPage.blocktypes.link.title"),
    block.paragraph("documentationPage.blocktypes.link.text"),
    block.code("options"),
    block.code(
      "block.link('translation.path', '/contribution/documentation-page#introduction', options)"
    ),
    block.code(
      "block.link('translation.path', '/getting-started/configuration-guide#components-config')"
    ),
    block.paragraph("documentationPage.compilesTo"),
    block.link(
      "documentationPage.blocktypes.link.exampleWithOptions",
      "/contribution/documentation-page#introduction",
      {
        preText: "prefix with **markdown** text",
        afterText: "suffix",
      }
    ),
    block.link(
      "documentationPage.blocktypes.link.example",
      "/getting-started/configuration-guide#components-config"
    ),

    block.headline("documentationPage.blocktypes.alert.title"),
    block.paragraph("documentationPage.blocktypes.alert.text"),
    block.code("block.alert('translation.path', 'danger')"),
    block.paragraph("documentationPage.compilesTo"),
    block.alert("documentationPage.blocktypes.alert.example", "danger"),
  ],
});
