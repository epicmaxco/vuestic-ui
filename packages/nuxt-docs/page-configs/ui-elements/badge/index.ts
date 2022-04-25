import { definePageConfig } from "~~/types/page-config";
import VaBadge from "vuestic-ui/src/components/va-badge/VaBadge.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("badge.title"),
    block.paragraph("badge.summaryText"),

    block.subtitle("all.examples"),
    block.exampleBlock("Default"),

    block.subtitle("badge.examples.position.title", 'h5'),
    block.example("Position"),

    block.subtitle("badge.examples.color.title", 'h5'),
    block.example("Color"),

    block.subtitle("badge.examples.dot.title", 'h5'),
    block.example("Dot"),

    block.subtitle("badge.examples.transparent.title", 'h5'),
    block.example("Transparent"),

    block.subtitle("badge.examples.withCard.title", 'h5'),
    block.example("WithCard"),

    block.subtitle("badge.examples.withAvatar.title", 'h5'),
    block.example("WithAvatar"),

    block.subtitle("all.api"),
    block.api(VaBadge),
  ],
});
