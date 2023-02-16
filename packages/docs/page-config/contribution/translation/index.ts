import { TranslationStatusPath, languages } from "../../../locales";

const columns = [
  "translation.table.language",
  "translation.table.code",
  "translation.table.supported",
];

const translationStatusPaths: TranslationStatusPath = {
  full: "translation.status.full",
  part: "translation.status.part",
};

const translationStatuses = languages.map((lang) => [
  lang.translationPath,
  lang.code,
  translationStatusPaths[lang.status as keyof TranslationStatusPath],
]);

export const translationSync = "yarn sync:translation <target locale file>";
export const searchUnusedTranslations = "yarn search:unused:translation";
export const searchMissedTranslations = "yarn search:missed:translation";

export default definePageConfig({
  blocks: [
    block.title("translation.title"),
    block.paragraph("translation.description"),
    block.table(columns, translationStatuses),

    block.subtitle("translation.sync.title"),
    block.paragraph("translation.sync.description"),
    block.code(translationSync, "bash"),

    block.subtitle("translation.unused.title"),
    block.paragraph("translation.unused.description"),
    block.code(searchUnusedTranslations, "bash"),

    block.subtitle("translation.missed.title"),
    block.paragraph("translation.missed.description"),
    block.code(searchMissedTranslations, "bash"),

    block.subtitle("translation.code.title"),
    block.paragraph("translation.code.description"),
    block.alert("translation.code.warn", "warning"),
    block.headline("translation.code.basicTitle"),
    block.paragraph("translation.code.basicText"),
    block.code("basic-scheme", "bash"),
    block.headline("translation.code.mustacheTitle"),
    block.paragraph("translation.code.mustacheText"),
    block.code("mustache-scheme", "bash"),
  ],
});
