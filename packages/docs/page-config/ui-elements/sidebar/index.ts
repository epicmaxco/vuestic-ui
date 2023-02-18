import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("sidebar.title"),
    block.paragraph("sidebar.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("Minimized"),
    block.example("Width"),
    block.example("MinimizedWidth"),
    block.example("Color"),
    block.example("Gradient"),
    block.example("Position"),
    block.example("Hoverable"),
    block.example("VModel"),

    block.subtitle("all.api"),
    block.api("VaSidebar", apiOptions),

    block.subtitle("all.faq"),
    block.headline("sidebar.faq.questions[0].question"),
    block.paragraph("sidebar.faq.questions[0].answer"),
  ],
});
