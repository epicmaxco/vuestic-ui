import vitesse from "./vitesse";

export default definePageConfig({
  meta: {
    title: "SSR guide",
    category: "getting-started",
  },

  blocks: [
    block.title("SSR"),
    block.paragraph("Vuestic is fully compatible with server-side rendering."),

    block.subtitle("CSS variables"),
    block.paragraph("Vuestic is fully compatible with server-side rendering."),
    block.code("css-variables"),

    block.subtitle("Examples"),
    block.paragraph("Here are two examples how you can add CSS variables to html head"),

    block.link("Look at Nuxt3 guide", "/getting-started/nuxt"),

    block.headline("Vite SSR Plugin"),
    block.paragraph("Learn more about [Vite SSR Plugin](https://vite-plugin-ssr.com/vue-tour)"),
    block.code("vite-ssr-plugin"),
    block.headline("Vitesse"),
    block.paragraph("Learn more about [Vitesse](https://github.com/antfu/vitesse) and [useHead](https://github.com/vueuse/head#server-side-rendering)"),
    block.code(vitesse),
  ],
});
