import { definePageConfig } from "~~/types/page-config";
import VaCarousel from "vuestic-ui/src/components/va-carousel/VaCarousel.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("carousel.title"),

    block.subtitle("all.examples"),

    // examples
    block.exampleBlock("Default"),

    block.exampleBlock("Arrows"),

    block.exampleBlock("Indicators"),

    block.exampleBlock("Vertical"),

    block.exampleBlock("Slots"),

    block.exampleBlock("Infinite"),

    block.exampleBlock("Autoscroll"),

    block.exampleBlock("Fade"),

    block.api(VaCarousel),
  ],
  meta: {
    badge: 'new',
  },
  manualApi: {
    props: {},
    events: {},
    methods: {},
    slots: {
      default: {},
      "prev-arrow": {},
      "next-arrow": {},
      indicator: {},
    },
  },
});
