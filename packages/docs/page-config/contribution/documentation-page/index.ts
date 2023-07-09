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
    // block.subtitle("Generators"),
    // block.paragraph("We have created custom generators to facilitate and automate the creation of new pages.."),
    // block.paragraph("* The `yarn generate:docspage` command will generate a page with the specified name in the category selected from the list.."),
    // block.paragraph("* The `yarn generate:component` command will generate a complete structure for a new component: create a component, connect it to a library, make a configuration file for it, and add a clean example to the examples folder."),

    block.subtitle("Component page structure"),
    block.paragraph("It is example of perfect component page structure. You can use it as a template for your component page. Not all blocks here required of course, but better to have them all."),

    block.list([
      "`title` - page title, component name",
      "`paragraph` - page description",
      "`subtitle` - \"When to use\"",
      "`list` - List of examples",
      "`subtitle` - \"Examples\"",
      "`example` - List of examples",
      "`subtitle` - \"Accessibility\"",
      "`paragraph` - keyboard navigation",
      "`paragraph` - additional information",
      "`subtitle` - \"API\"",
      "`api` - component api or `table` for manual api",
      "`subtitle` - \"FAQ\"",
      "`headline` - List of questions covered by `paragraph` with the answer", 
    ]),

    block.paragraph("Pages in Services, Getting Started, e.g. don't actually have a structure, but here are general rules"),

    block.list([
      "Add description paragraph after `title` and `subtitle`",
      "Provide examples as much as you can",
      "Keep it simple",
    ]),

    // BlockTypes
    block.subtitle("Block Types"),

    block.example("Title", {
      title: "Title",
      description: "Page title is **mandatory** for documentation pages.",
      customCode: {
        source: `block.title('Title (example)')`,
        lang: "js",
      },
      forceShowCode: true,
    }),

    block.example("Subtitle", {
      title: "Subtitle",
      description: "Used for examples, API, FAQ. Think about it as `h2`.",
      customCode: {
        source: `block.subtitle('Subtitle (example)')`,
        lang: "js",
      },
      forceShowCode: true,
    }),

    block.example("Headline", {
      title: "Headline",
      description: "The `headline` block is used to mark the titles of examples and the FAQs. Think about it as `h3`.",
      customCode: {
        source: `block.subtitle('Headline (example)')`,
        lang: "js",
      },
      forceShowCode: true,
    }),

    block.example("Paragraph", {
      title: "Paragraph",
      description: "Should be used for all the regular text blocks. For links to external resources you can specify the **target** attribute in markdown markup as follows: `[name](href)[[target=_blank]]`.",
      customCode: {
        source: `block.paragraph('Paragraph (example). Link in the text leading to an external resource: [markdown-it-attrs](https://github.com/arve0/markdown-it-attrs)[[target=_blank]].')`,
        lang: "js",
      },
      forceShowCode: true,
    }),


    block.example("List", {
      title: "List",
      description: "Should be used for lists.",
      customCode: {
        source: `block.list(['Value of list item 1', 'Value of list item 2'])`,
        lang: "js",
      },
      forceShowCode: true,
    }),

    block.example("Code", {
      title: "Code",
      description: "For the code previews we use [highlight.js](https://highlightjs.org/)[[target=_blank]].",
      customCode: {
        source: `block.code('
  <div>Code string</div>
')`,
        lang: "js",
      },
      forceShowCode: true,
    }),


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

    block.example("Table", {
      title: "Table",
      description: "Used to display tabular data. Requires a flat column-definitions array and yet another two-dimensional-array with the actual cells' data.",
      customCode: {
        source: `block.table(columns, tableData)`,
        lang: "js",
      },
      forceShowCode: true,
    }),

    block.example("Link", {
      title: "Link",
      description: "Used for relative (local) links processed by the router (with *options* or without them).",
      customCode: {
        source: `block.link('Link (example)', '/getting-started/configuration-guide#components-config')`,
        lang: "js",
      },
      forceShowCode: true,
    }),

    block.example("Alert", {
      title: "Alert",
      description: "Used to display an important message.",
      customCode: {
        source: `block.alert('Alert (example)', 'danger')`,
        lang: "js",
      },
      forceShowCode: true,
    }),
  ],
});
