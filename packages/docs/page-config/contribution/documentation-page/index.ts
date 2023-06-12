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
    block.title("Working with documentation"),
    block.paragraph("This page is intended for Vuestic-UI contributors. It explains the ways to create and modify the documentation."),

    block.subtitle("Introduction"),
    block.paragraph("Instead of using the established documentation system, such as [vue-press](https://vuepress.vuejs.org/)[[target=_blank]] or [docsify](https://docsify.js.org/#/)[[target=_blank]], we decided to build a system specifically tailored for Vuestic. It’s meant to provide an excellent flexibility for the future growth."),

    // Page Config
    block.subtitle("Page Config"),
    block.paragraph("The page configuration must be located in a specific path, which is similar to the page URL. The folder with the page configuration must include the `components` folders for blocks with components and` examples` for blocks with examples. These folders should contain the `* .vue` files. An example of the structure and directory of the configuration folder for the current page:"),
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
    block.paragraph("The configuration file contains `config`, which is an array of page blocks that perform specific functions."),

    // Generators
    block.subtitle("Generators"),
    block.paragraph("We have created custom generators to facilitate and automate the creation of new pages.."),
    block.paragraph("* The `yarn generate:docspage` command will generate a page with the specified name in the category selected from the list.."),
    block.paragraph("* The `yarn generate:component` command will generate a complete structure for a new component: create a component, connect it to a library, make a configuration file for it, and add a clean example to the examples folder."),

    // BlockTypes
    block.subtitle("Block Types"),

    block.headline("Title"),
    block.paragraph("Page title is **mandatory** for documentation pages."),
    block.code("block.title('Title (example)')"),
    block.paragraph("Compiles to:"),
    block.title("Title (example)"),

    block.headline("Subtitle"),
    block.paragraph("Used for examples, API, FAQ. Think `h2`."),
    block.code("block.subtitle('Subtitle (example)')"),
    block.paragraph("Compiles to:"),
    block.subtitle("Subtitle (example)"),

    block.headline("Headline"),
    block.paragraph("The `headline` block is used to mark the titles of examples and the FAQs. Think `h3`."),
    block.code("block.headline('Headline (example)')"),
    block.paragraph("Compiles to:"),
    block.headline("Headline (example)"),

    block.headline("Paragraph"),
    block.paragraph("Should be used for all the regular text blocks. For links to external resources you can specify the **target** attribute in markdown markup as follows: `[name](href)[[target=_blank]]`."),
    block.code("block.paragraph('Paragraph (example). Link in the text leading to an external resource: [markdown-it-attrs](https://github.com/arve0/markdown-it-attrs)[[target=_blank]].')"),
    block.paragraph("Compiles to:"),
    block.paragraph("Paragraph (example). Link in the text leading to an external resource: [markdown-it-attrs](https://github.com/arve0/markdown-it-attrs)[[target=_blank]]."),

    block.headline("List"),
    block.paragraph("Should be used for lists."),
    block.code("block.list(['Value of list item 1', 'Value of list item 2'])"),
    block.paragraph("Compiles to:"),
    block.list([
      "Value of list item 1",
      "Value of list item 2",
    ]),
    block.paragraph("Here's the resulting markup for the code above:"),
    block.code("list"),

    block.headline("Code"),
    block.paragraph("For the code previews we use [highlight.js](https://highlightjs.org/)[[target=_blank]]."),
    block.code("block"),
    block.paragraph("Compiles to:"),
    block.code("<div>Code string</div>"),

    block.headline("Example"),
    block.paragraph("Shows a component with code preview. Component can use all global services: css classes, colors etc. Mostly used in the ui-elements section to show examples of use."),
    block.code("block.example('ComponentName')"),

    block.headline("Component"),
    block.paragraph("Shows a component that has some logic and is not an example of use."),
    block.code("block.component('ComponentName')"),

    block.headline("API"),
    block.paragraph("The API-documentation for a component. Combines component options with manual declarations."),
    block.code("block.api(VaComponent, apiDescription, apiOptions)"),

    block.headline("API Options"),
    block.paragraph("We can't go too far with the help of automated code analysis. Most of the API documentation has to be declared explicitly. API options allow you to configure things such as: version, props, events, methods and slots."),
    block.paragraph("`hidden` - allows you to hide the prop from the API section of the documentation page. Might become quite useful for some props which are intended for internal use solely."),
    block.paragraph("`types` - the documentation engine can automatically infer simple prop types (such as `String`, `Number`, etc.) right from the component options. Almost any other type should be defined explicitly."),
    block.paragraph("`version` - specifies the version of Vuestic UI that this component or feature has been introduced at."),
    block.code("api-options"),

    block.headline("Table"),
    block.paragraph("Used to display tabular data. Requires a flat column-definitions array and yet another two-dimensional-array with the actual cells' data."),
    block.code("tabledata"),
    block.code("block.table(columns, tableData)"),
    block.paragraph("Compiles to:"),
    block.table(columns, tableData),

    block.headline("Link"),
    block.paragraph("Used for relative (local) links processed by the router (with *options* or without them)."),
    block.code("options"),
    block.code(
      "block.link('Link with options (example)', '/contribution/documentation-page#introduction', options)"
    ),
    block.code(
      "block.link('Link (example)', '/getting-started/configuration-guide#components-config')"
    ),
    block.paragraph("Compiles to:"),
    block.link(
      "Link with options (example)",
      "/contribution/documentation-page#introduction",
      {
        preText: "prefix with **markdown** text",
        afterText: "suffix",
      }
    ),
    block.link(
      "Link (example)",
      "/getting-started/configuration-guide#components-config"
    ),

    block.headline("Alert"),
    block.paragraph("Used to display an important message."),
    block.code("block.alert('Alert (example)', 'danger')"),
    block.paragraph("Compiles to:"),
    block.alert("Alert (example)", "danger"),
  ],
});
