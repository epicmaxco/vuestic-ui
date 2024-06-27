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
    block.paragraph("Component config allows you to override default `props`, `attributes` and `slot` values for any Vuestic component. It is an object where the keys are component names and the values are prop-value pairs you want to overwrite."),
    block.paragraph("Configuration can be combined in `preset`, in case you want to have different types of default configurations for component."),
    block.paragraph("You can use `all` property to set prop values for all components at once. It will be applied if there are no other source of prop value."),
    block.paragraph("Sometimes Vuestic components have nested other Vuestic components. You can configure child components as well adding `child:` prefix and component child name to the prop name."),

    block.subtitle("Global config"),
    block.paragraph("You can set global configuration for all components using `createVuestic` function. For example:"),
    block.code("components-config"),
    block.paragraph("You can also use `useGlobalConfig` composable to get global configuration in your component programaticaly during runtime."),
    block.paragraph("We make sure all configuration is fully reactive to changes in Components Config"),

    block.subtitle("Scoped config"),
    block.paragraph("Using `VaConfig` will update not update the global configuration, but only the components inside the `VaConfig`. "),
    block.example("va-config", { hideTitle: true, forceShowCode: true }),
    block.paragraph("Notice that passing props directly on component will have the highest priority than VaConfig."),
    block.link("Find out more about VaConfig component", "/ui-elements/config"),

    block.subtitle("Props and attributes"),
    block.paragraph("In components config you can override default props and attributes."),
    block.paragraph("Any kind of attribute can be applied. Usually it is used for `class` and `style` attributes. For example:"),
    block.code("components-attributes"),
    block.code("components-attributes-style", "css"),
    block.example("attributes", { hideTitle: true, hideCode: true }),
    block.alert("Notice that using components config in `createVuestic` will update all components globally! In this example, we use `VaConfig` to apply this changes locally."),

    block.subtitle("Presets config"),
    block.paragraph("For each component you can make preset configurations. It is useful when you have a set of props that you want to use in different places. For example, you can create a preset for a button with a specific color and size. Then you can use this preset in different places. For example:"),
    block.code("components-presets"),
    block.example("presets", { hideTitle: true, forceShowCode: true }),
    block.paragraph("You can apply multiple presets to the same component. Props from the later presets will override props from the former:"),
    block.code("components-presets-multiple"),
    block.example("presets-multiple", { hideTitle: true, forceShowCode: true }),

    block.subtitle("All components config"),
    block.paragraph("You could use `components.all` global config property to set prop values for all components at once. It will be applied if there are no other source of prop value. For example:"),
    block.code("components-all"),
    block.paragraph("These prop values will be used as defaults if prop is not set somewhere else (inside the component or other configs)."),

    block.subtitle("Child components config"),
    block.paragraph("You can also configure child components. For example, you can configure the `VaButton` component inside the `VaModal` component. For example:"),
    block.example("child-components", { hideTitle: true, forceShowCode: true }),
    block.alert("This feature is work in progress. We need to give names to child components and document them. If you want to be able to customize concrete child component, please create an issue on GitHub."),

    block.subtitle("Slots config"),
    block.paragraph("There are cases when `class` and `style` are not enough. In case you need to change HTML content for component globally use `slot:`. For example:"),
    block.code("components-slots"),
    block.code("components-slots-style", "css"),
    block.example("slots", { hideTitle: true }),
    block.paragraph("You can pass `plain text`, `vue component` or `vue vNode` as valid slot value."),

    block.subtitle("Props values priority"),
    block.paragraph("You are able to specify props values via: direct, `va-config`, `presets config`, `components config`, `components all config`. Their priority (in case several options were used) is presented at the scheme below:"),
    block.component("Priority"),

    block.subtitle("Default sizes"),
    block.paragraph("If you would like to set default sizes for the component you could use sizesConfig property. Feel free to check the example below:"),
    block.code("components-default-sizes"),
    block.alert("Notice that this is going to move in separate feature and API can be changed in future."),

    // api
    // block.subtitle("Component config service API"),
    // block.headline("Types"),
    // block.table(columns, tableData),
  ],
});
