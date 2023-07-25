export default definePageConfig({
  meta: {
    title: "Accessibility guide",
    category: "introduction",
  },

  blocks: [
    block.title("Accessibility"),
    block.paragraph("Vuestic UI components are support keyboard interactions for all mouse-based actions, utilize HTML5 semantic elements where applicable and provide full coverage by WAI-ARIA attributes."),

    block.example("KeyboardInteractions", {
      title: 'Keyboard accessible',
      description: 'All interactive elements of your page should be accessible by keyboard (e.g. text boxes, buttons, etc). That means you should be able focus on them via `Tab` and `Shift+Tab` keys. Focused via keyboard elements have their own visual state. For example, you can focus `date-input` component below via `Tab`, then call `date-picker` via `Enter` and select date, using left-right keys, `Shift+Tab` to focus year and month, `Enter` to confirm the selection and `Esc` to close the picker.'
    }),

    block.example("WaiAria", {
      title: 'WAI-ARIA',
      description: "All our components are fully (depending on their roles) covered by [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/)[[target=_blank]] attributes, providing full support for screen-readers. For example, simple input below provides for screen-readers information about inputs name, it is disabled or readonly, it is necessary to fill it and  it doesn\'t contain any validation errors."
    }),
  ],
});
