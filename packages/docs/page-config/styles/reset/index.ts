export default definePageConfig({
  blocks: [
    block.title("CSS Reset"),
    block.paragraph("CSS helpers and the CSS reset file will remain in the Vuestic UI bundle until version 1.7.0, after which they will be permanently removed."),
    block.alert("We use `reset.scss` to reset and normalize basic CSS styles", "warning", true),

    block.headline("Reset features"),
    block.paragraph("Below is a list of features that are provided by reset.scss:"),
    block.paragraph("* Margin and padding reset. \n * Border reset. \n * Hide quotes. \n * Font reset. \n * Hidden-attribute fix for newer browsers. \n * HTML5 display-role reset for older browsers"),
    block.paragraph("For a complete list of all applied styles, see the [reset.scss](https://github.com/epicmaxco/vuestic-ui/blob/develop/packages/ui/src/styles/global/reset.scss)[[target=_blank]] stylesheet.")
  ]
});
