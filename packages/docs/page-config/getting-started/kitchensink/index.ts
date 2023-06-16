import { BaseBlock } from "../../../modules/page-config/runtime";

const EXCLUDED_COMPONENTS: string[] = ["Backtop"];

const pageConfigs = usePageConfigs();

const resolveConfigs = async () => {
  return (
    await Promise.all(
      Object.keys(pageConfigs).map(async (name) => {
        if (!name.includes("ui-elements")) { return }

        const config = (await pageConfigs[name]()).default;

        const titleBlock = config.blocks.find(
          (configBlock) => configBlock.type === "title"
        ) as { type: "title"; text: string } | null;

        const examplesFolder = `page-config/${name}/examples/`;

        const exampleBlock = config.blocks.find(
          (blockElement) =>
            blockElement.type === "example" &&
            blockElement.path.replace(examplesFolder, "") === "Default.vue"
        );

        if (!exampleBlock || !titleBlock) {
          return;
        }

        if (EXCLUDED_COMPONENTS.includes(titleBlock.text)) {
          return;
        }

        const path = `/ui-elements/${name
          .replace("/page-config.ts", "")
          .replace("./", "")}`;

        return [
          titleBlock,
          {...exampleBlock, hideTitle: true },
          block.link("See more", path),
        ];
      })
    )
  )
    .filter(Boolean)
    .flat(1) as BaseBlock[];
};

export default definePageConfig({
  meta: {
    title: "Kitchensink",
    category: "getting-started",
  },

  blocks: [
    block.title("Kitchensink"),
    block.paragraph("At this page you can see examples for all components, this is a great place to get started with `Vuestic`. For even more examples you can check `UI Elements` tab in menu."),
    block.async(resolveConfigs()),
  ],
});
