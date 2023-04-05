import apiOptions from "./api-options";

export default definePageConfig({
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
