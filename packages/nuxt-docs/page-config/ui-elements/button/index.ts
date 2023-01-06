export default definePageConfig({
  meta: {
    title: "Hello",
    category: "component",
  },

  blocks: [
    block.title("button.title"),
    block.paragraph("button.summaryText"),

    block.subtitle("all.examples"),
    block.example("Default"),
    block.example("Presets"),
    block.example("WithColor"),
    block.example("WithGradient"),
    block.example("WithTextColor"),
    block.example("WithSize"),
    block.example("WithRound"),
    block.example("WithOutline"),
    block.example("WithIcon"),
    block.example("WithLoading"),
    block.example("Behavior"),
    block.example("Disabled"),

    block.subtitle("all.api"),
    block.api('VaButton', {
      slots: {
        default: { },
        prepend: { },
        append: { },
        loading: { },
      },
      events: {
        click: { types: '`() => Event`', isDOMEvent: true },
      },
      methods: {
        focus: { types: '`() => void`' },
        blur: { types: '`() => void`' },
      },
    }),

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-button/_variables.scss"),
  ],
});
