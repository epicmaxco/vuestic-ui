export default definePageConfig({
  blocks: [
    block.title("treeShakingRequirements.title"),
    block.paragraph("treeShakingRequirements.description"),

    block.subtitle("treeShakingRequirements.about.title"),
    block.paragraph("treeShakingRequirements.about.description"),
    block.list([
      "treeShakingRequirements.about.distFormats.esm",
      "treeShakingRequirements.about.distFormats.esmSsr",
      "treeShakingRequirements.about.distFormats.iife",
      "treeShakingRequirements.about.distFormats.cjs",
      "treeShakingRequirements.about.distFormats.style",
    ]),
    block.alert("treeShakingRequirements.about.notice", "primary"),

    block.subtitle("treeShakingRequirements.requirements.title"),
    block.paragraph("treeShakingRequirements.requirements.esModules"),
    block.paragraph("treeShakingRequirements.requirements.dependencies"),
    block.paragraph("treeShakingRequirements.requirements.beforeBuild"),
  ],
});
