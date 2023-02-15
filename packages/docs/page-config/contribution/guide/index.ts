export default definePageConfig({
  blocks: [
    block.title("guide.title"),
    block.paragraph("guide.description"),

    block.subtitle("guide.quickStart.title"),
    block.paragraph("guide.quickStart.description"),
    block.list([
      "guide.quickStart.steps.1",
      "guide.quickStart.steps.2",
      "guide.quickStart.steps.3",
    ]),

    block.subtitle("guide.packages.title"),
    block.paragraph("guide.packages.description"),
    block.list([
      "guide.packages.list.ui",
      "guide.packages.list.docs",
      "guide.packages.list.nuxt",
      "guide.packages.list.sandbox",
      "guide.packages.list.vue-cli-plugin",
      "guide.packages.list.ag-grid-theme",
      "guide.packages.list.deploy",
    ]),
    block.paragraph("guide.packages.notice"),

    block.subtitle("guide.branches.title"),
    block.list([
      "guide.branches.publicBranches",
      "guide.branches.localBranches",
    ]),

    block.subtitle("guide.commonlyUsedScripts.title"),
    block.list([
      "guide.commonlyUsedScripts.list.demo",
      "guide.commonlyUsedScripts.list.docs",
      "guide.commonlyUsedScripts.list.generateDocspage",
      "guide.commonlyUsedScripts.list.generateComponent",
    ]),
    block.paragraph("guide.commonlyUsedScripts.notice"),

    block.subtitle("guide.componentFolderStructure.title"),
    block.link(
      "guide.componentFolderStructure.link",
      "https://github.com/epicmaxco/vuestic-ui/issues/1907"
    ),

    block.subtitle("guide.pullRequests.title"),
    block.list([
      "guide.pullRequests.description.localBranches",
      "guide.pullRequests.description.dontSubmitToMaster",
      "guide.pullRequests.description.checkoutFeat",
      "guide.pullRequests.description.multipleSmallCommits",
      "guide.pullRequests.description.fixBugSteps",
    ]),

    block.subtitle("guide.forCoreContributors.title"),
    block.list([
      "guide.forCoreContributors.linkPr",
      "guide.forCoreContributors.assignYourself",
      "guide.forCoreContributors.smallIssues",
      "guide.forCoreContributors.singlePrPerIssue",
      "guide.forCoreContributors.onePersonPerIssue",
      "guide.forCoreContributors.checkYourCode",
      "guide.forCoreContributors.weUseYarn",
      "guide.forCoreContributors.beProactive",
      "guide.forCoreContributors.recommendedTools",
      "guide.forCoreContributors.workInBook",
    ]),

    block.subtitle("guide.credits.title"),
    block.paragraph("guide.credits.description"),
  ],
});
