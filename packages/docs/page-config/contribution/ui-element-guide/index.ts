export default definePageConfig({
  blocks: [
    block.title("UI Element Requirements"),
    block.paragraph("This page is intended for Vuestic UI contributors. It describes the requirements for the UI elements."),
    block.subtitle("High Level Strategy"),
    block.list([
      "Components should be as user expects them to be. We achieve that by checking refs ([Vuetify](https://vuetifyjs.com)[[target=_blank]], [Quasar](https://quasar.dev)[[target=_blank]], [Ant Design](https://ant.design)[[target=_blank]], [iView](http://iview.talkingdata.com)[[target=_blank]], [Element UI](https://element.eleme.io)[[target=_blank]], etc.).",
      "Components should be of high quality. We achieve that by manually testing edge-cases and by early refactoring.",
      "Components should be eligible according to [WAI ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/)[[target=_blank]] and [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/)[[target=_blank]].",
    ]),
    block.subtitle("Core Features"),
    block.list([
      "**Visual feedback** - When a user interacts with a component they should see a result of their actions (could be implemented with :active selector or somehow else depending on the case).",
      "**Keyboard navigation** - You must ensure that UI elements are keyboard-accessible, and you must disable that functionality for elements that should not receive keyboard focus.",
      "**Stateless support** (see the [StatefulMixin](https://github.com/epicmaxco/vuestic-ui/blob/develop/packages/ui/src/mixins/StatefulMixin/README.md)[[target=_blank]]).",
    ]),
  ],
});
