import apiOptions from "./api-options";

export default definePageConfig({
  head: {
    link: [
      { rel: 'dns-prefetch', as: 'script', href: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js' },
      { rel: 'dns-prefetch', as: 'script', href: 'https://kit.fontawesome.com/5460c87b2a.js' },
    ],

    script: [
      { crossorigin: 'anonymous', src: 'https://kit.fontawesome.com/5460c87b2a.js' },
      { type: 'module', src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js' },
    ],
  },

  blocks: [
    block.title("icon.title"),
    block.paragraph("icon.summaryText"),

    block.component("Playground"),

    block.link("icon.iconsConfig", "services/icons-config"),

    block.subtitle("all.examples"),

    block.example("Default", {
      codesandboxConfig: {
        requireIcons: true,
      },
    }),
    block.alert("icon.examples.default.alert", "warning"),
    block.example("Color"),
    block.example("Size"),
    block.example("Rotation"),
    block.example("Spin"),
    block.example("Text"),
    block.example("Tag"),


    block.subtitle('all.accessibility'),
    block.paragraph('icon.accessibility'),

    block.subtitle("all.api"),
    block.api("VaIcon", apiOptions),
  ],
});
