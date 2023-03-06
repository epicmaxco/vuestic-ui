export default definePageConfig({
  blocks: [
    block.title("tailwind.title"),
    block.paragraph("tailwind.summaryText"),

    block.alert("tailwind.deprecated", "warning"),

    block.headline("tailwind.preparation.title"),
    block.paragraph("tailwind.preparation.text"),

    block.headline("tailwind.features.integration.title"),
    block.paragraph("tailwind.features.integration.text"),

    block.paragraph("tailwind.features.integration.instructionIntro"),

    block.paragraph("tailwind.features.integration.instruction[0]"),
    block.code({
      npm: "npm install @vuestic/tailwind",
      yarn: "yarn add @vuestic/tailwind"
    }, "bash"),

    block.paragraph("tailwind.features.integration.instruction[1]"),
    block.paragraph("tailwind.features.integration.instruction[2]"),
    block.paragraph("tailwind.features.integration.instruction[3]"),
    block.paragraph("tailwind.features.integration.instruction[4]"),

    block.alert("tailwind.features.integration.extendAlert", "primary"),

    block.paragraph("tailwind.features.integration.instruction[5]"),
    block.code("configuringFull"),

    block.paragraph("tailwind.features.integration.instruction[6]"),
    block.code("configuringPartial"),

    block.paragraph("tailwind.features.integration.instruction[7]"),

    block.paragraph("tailwind.features.integration.instruction[8]"),
    block.code("configExample"),

    block.paragraph("tailwind.features.integration.instruction[9]")
  ]
});
