export default definePageConfig({
  meta: {
    title: "Browser support",
    category: "introduction",
  },

  blocks: [
    block.title("Browser Support"),
    block.paragraph("We design Vuestic UI to be future proof. That's why we support modern browsers, but some old browsers, such as IE had to go, sorry. That decision was influenced by [dropped support in Vue 3](https://github.com/vuejs/rfcs/discussions/296)[[target=_blank]] and [falling usage rate](https://caniuse.com/usage-table)[[target=_blank]]."),
    block.component("browsers-table"),
  ],
});
