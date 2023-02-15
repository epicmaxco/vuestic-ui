import vitesse from "./vitesse";

export default definePageConfig({
  meta: {
    title: "SSR guide",
    category: "getting-started",
  },

  blocks: [
    block.title("ssrGuide.title"),
    block.paragraph("ssrGuide.description"),

    block.subtitle("ssrGuide.cssVariables.title"),
    block.paragraph("ssrGuide.cssVariables.description"),
    block.code("css-variables"),

    block.subtitle("ssrGuide.solutions.title"),
    block.paragraph("ssrGuide.solutions.description"),

    block.link("ssrGuide.solutions.nuxt", "/en/getting-started/nuxt"),

    block.headline("ssrGuide.solutions.viteSsrPlugin.title"),
    block.paragraph("ssrGuide.solutions.viteSsrPlugin.description"),
    block.code("vite-ssr-plugin"),
    block.headline("ssrGuide.solutions.vitesse.title"),
    block.paragraph("ssrGuide.solutions.vitesse.description"),
    block.code(vitesse),
  ],
});
