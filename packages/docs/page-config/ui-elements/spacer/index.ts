export default definePageConfig({
  blocks: [
    block.title("Spacer component"),
    block.paragraph("`va-spacer` is an equivalent for the `flex-grow` property. It allows you to get more space between flex components."),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Basic usage",
      description: "`va-spacer` adding a div with the `.va-spacer` class."
    }),

    block.subtitle('Accessibility'),
    block.paragraph('The component completely ignored by screen readers because of [aria-hidden=\"true\"](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden)[[target=_blank]] attribute.'),
  ],
});
