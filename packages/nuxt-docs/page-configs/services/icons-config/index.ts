import {
  TableColumn,
  TableData,
} from "~~/components/docs/blocks/DocsTable/DocsTableTypes";
import { definePageConfig } from "~~/types/page-config";
import { fontCodeExample, fontTransformationsExample, aliasCodeExample, aliasesTransformationsExample, setupCodeExample } from './code-examples'

const columns: TableColumn[] = [
  "Prop",
  { title: "Type", type: "code" },
  { title: "Description", type: "markdown" },
];

const tableData: TableData = [
  ["name", "string | RegExp", "iconsConfig.api.name"],
  [
    "class",
    "string | ((...dynamicSegments: string[]) => string) | undefined",
    "iconsConfig.api.iconClass",
  ],
  [
    "content",
    "string | ((...dynamicSegments: string[]) => string | undefined) | undefined",
    "iconsConfig.api.content",
  ],
  ["component", "`VueComponent | undefined`", "iconsConfig.api.component"],
  [
    "componentProps",
    "`Record<string, any> | ((...dynamicSegments: string[]) => Record<string, any>) | undefined`",
    "iconsConfig.api.componentProps",
  ],
  ["to", "`string | undefined`", "iconsConfig.api.to"],
  ["tag", "`string | undefined`", "iconsConfig.api.tag"],
  ["color", "`string | undefined`", "iconsConfig.api.color"],
  ["rotation", "`number | string | undefined`", "iconsConfig.api.rotation"],
  [
    "spin",
    "`'clockwise' | 'counter-clockwise' | undefined`",
    "iconsConfig.api.spin",
  ],
];

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("iconsConfig.title"),
    block.paragraph("iconsConfig.about"),
    block.link("iconsConfig.readBeforeStart", "/ui-elements/icon"),

    block.paragraph("iconsConfig.problem.definition"),
    block.paragraph("iconsConfig.problem.materialIcons"),
    block.code('<span class="material-icons">star</span>'),

    block.paragraph("iconsConfig.problem.fontAwesome"),
    block.code('<i class="fas fa-star"></i>'),

    block.paragraph("iconsConfig.problem.summary"),

    // fonts
    block.subtitle("iconsConfig.fonts.title"),
    block.paragraph("iconsConfig.fonts.about"),

    block.subtitle("iconsConfig.fonts.fontNamePattern.title", 'h5'),
    block.paragraph("iconsConfig.fonts.fontNamePattern.about"),
    block.example("font", { hideCode: true }),

    block.subtitle("iconsConfig.fonts.example.title", 'h5'),
    block.paragraph("iconsConfig.fonts.example.about"),
    block.code(fontCodeExample),
    block.paragraph("iconsConfig.fonts.example.explain"),
    block.code(fontTransformationsExample),

    block.link(
      "iconsConfig.fonts.advancedFontsUsage",
      "/services/global-config",
      { preText: "iconsConfig.fonts.readMore" }
    ),

    // aliases
    block.subtitle("iconsConfig.aliases.title"),
    block.paragraph("iconsConfig.aliases.about"),

    block.subtitle("iconsConfig.aliases.example.title", 'h5'),
    block.code(aliasCodeExample),

    block.paragraph("iconsConfig.aliases.example.about"),
    block.code(aliasesTransformationsExample),
    block.paragraph("iconsConfig.aliases.example.explain"),

    // setup
    block.subtitle("iconsConfig.setup.title"),
    block.paragraph("iconsConfig.setup.about"),
    block.code(setupCodeExample),

    // api
    block.subtitle("iconsConfig.api.title"),
    block.table(columns, tableData),
  ],
});
