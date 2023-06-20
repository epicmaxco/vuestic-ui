export default definePageConfig({
  blocks: [
    block.title("Css Variables"),
    block.paragraph("Vuestic UI extracts crucial CSS styles in the form of [CSS variables (custom properties)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)[[target=_blank]]. No need to install any loaders or additional packages to override components' styling. Instead, you can deeply customize components' visuals using the following simple syntax."),

    block.component("convention"),

    block.list([
      "`components-name` can include sub block names, for example: `card`, `button-content`, `input-placeholder`.",
      "`variable-name` usually is just CSS property name, for example: `display`, `align`, `border-radius`.",
    ]),
    block.alert("List of component CSS variables can be found at the bottom of its documentation page.", "info"),

    block.example("profile", {
      title: "CSS variables override example",
      description: 'If you dislike how component looks, you can override default component style. Each component has list of CSS variables, that you override. For example, you want to change avatar `border-radius`:',
      forceShowCode: true,
      hideTemplate: true
    }),

    block.headline("Global Overriding"),
    block.paragraph("No additional tooling is needed. Just create a CSS file (like `overrides.css`), import it into your `main.js` and start redefining the variables as you do with any other CSS properties:"),
    block.code("overriding"),
    block.component("global-overriding"),
  ],
});
