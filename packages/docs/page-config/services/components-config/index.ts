const columns = [
  "Name",
  { title: "Type", type: "code" },
  { title: "Description", type: "markdown" },
];

const tableData = [
  [
    "ComponentsConfig",
    "{ [componentName: string]: Props }",
    "Object where the keys are Vuestic component names and the values are the component's new default props.",
  ],
  [
    "ComponentsAllConfig",
    "{ [propName: string]: any }",
    "Object where the keys are prop names and the values are the prop's new default values. Will be applied if there are no other source of prop value.",
  ],
  [
    "ComponentsPresetsConfig",
    "{ [componentName: string]: { [propName: string]: any } }",
    "Object where the keys are Vuestic component names and the values are objects where the keys are prop names and the values are the prop's values.",
  ],
];

export default definePageConfig({
  blocks: [
    block.title("Components config"),
    block.paragraph("Component config allows you to override default props values for any Vuestic component. It is an object where the keys are component names and the values are prop-value pairs you want to overwrite. Moreover, there are two more nested configuration objects &mdash; `presets` и `all`. `preset` allows you to specify named props combinations for any component. `all` allows you to specify props value for all Vuestic components. For example:"),
    block.code("components-config"),

    block.paragraph("The example below allows you to change styling of all buttons for the whole Vuestic documentation site."),
    block.example("button", { hideTitle: true }),

    block.subtitle("All components config"),
    block.paragraph("You could use `components.all` global config property to set prop values for all components at once. It will be applied if there are no other source of prop value. For example:"),
    block.code("components-all"),
    block.paragraph("These prop values will be used as defaults if prop is not set somewhere else (inside the component or other configs)."),

    block.subtitle("Presets config"),
    block.paragraph("As was said, `presets` allows you to specify named props combinations for Vuestic components and then use them in your application. For example:"),
    block.code("components-presets"),
    block.example("presets", { hideTitle: true }),

    block.subtitle("Scoped config"),
    block.paragraph("You can use the `<va-config>` component to overwrite the default props values for the components inside that tag. Take a look at the demo below:"),
    block.example("va-config", { hideTitle: true }),
    block.paragraph("Look at the code. In this demo we have changed the default color for all the `VaButton` and `VaIcon` inside the `VaConfig`. We also have passed a different value to the third button's `color` prop (direct component's prop takes precedence over the one specified on the `VaConfig`)."),
    block.link("Find out more about VaConfig component", "/ui-elements/config"),

    block.subtitle("Props values priority"),
    block.paragraph("You are able to specify props values via: direct, `va-config`, `presets config`, `components config`, `components all config`. Their priority (in case several options were used) is presented at the scheme below:"),
    block.example("priority", { hideCode: true, hideTitle: true }),

    block.subtitle("Default sizes"),
    block.paragraph("If you would like to set default sizes for the component you could use sizesConfig property. Feel free to check the example below:"),
    block.code("components-default-sizes"),

    // api
    block.subtitle("Component config service API"),
    block.headline("Types"),
    block.table(columns, tableData),
  ],
});
