import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("Scoped Config"),
    block.paragraph("`VaConfig` is a utility component that allows you to configure components (provide specific default prop values to components) locally in a section of your application. This is useful when you have a local scope where your components have props other than global ones."),
    block.link("Find out more about components config", "/services/components-config"),

    block.subtitle("Examples"),

    block.example("Components", {
      title: "Components",
      description: "By default, `VaConfig` does nothing. You must provide the `components` prop with the `vuestic` components configuration.",
    }),
    block.link('Learn more about Components Config', '/services/components-config'),
    // block.example("Colors", {
    //       title: "Colors",
    //       description: "You can configure colors for components. For example, you can change color whole preset name.",
    //     }),
    // block.link('Learn more about Colors Config', '/services/colors-config'),
    block.example("Internalization", {
      title: "i18n",
      description: "You can configure i18n translations for components.",
    }),
    block.link('Learn more about i18n Config', '/services/i18n'),

    block.subtitle("API"),
    block.api("VaConfig", {
      props: { components: "Components configuration object." }
    }, apiOptions),

    block.changeLog({
      '1.8.0': [
        'Components config now supports passing attributes such as class, style, href, data-*, etc. the same way props work',
      ],
    })
  ],
});
