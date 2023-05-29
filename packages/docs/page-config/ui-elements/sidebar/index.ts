import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("sidebar.title"),
    block.paragraph("sidebar.summaryText"),

    block.subtitle("Examples"),

    block.example("Default"),
    block.example("Minimized"),
    block.example("Width"),
    block.example("MinimizedWidth"),
    block.example("Color"),
    block.example("Gradient"),
    block.example("Position"),
    block.example("Hoverable"),
    block.example("VModel"),

    block.subtitle("API"),
    block.api("VaSidebar", apiOptions),

    block.subtitle("FAQ"),
    block.headline("sidebar.faq.questions[0].question"),
    block.paragraph("sidebar.faq.questions[0].answer"),
  ],
});
