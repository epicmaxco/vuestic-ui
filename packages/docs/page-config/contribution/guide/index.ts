export default definePageConfig({
  blocks: [
    block.title("Contribution guide"),
    block.paragraph("This guide describes the possible ways in which you can become a part of the ongoing development of Vuestic UI. We are really excited that you are interested in helping us make Vuestic better!"),

    block.subtitle("Quick start"),
    block.paragraph("If you want to make some changes get a local copy of VuesticUI:"),
    block.list([
      "Fork Vuestic repository",
      "Clone your fork",
      "Install dependencies with [yarn](https://classic.yarnpkg.com/lang/en/docs/install) using `yarn install`",
    ]),

    block.subtitle("Packages"),
    block.paragraph("Vuestic has few packages in order of importance for newcomers:"),
    block.list([
      "`packages/ui` - UI lib with demos. Here all vuestic components stored.",
      "`packages/docs` - [ui.vuestic.dev](https://vuestic.dev) source code.",
      "`packages/nuxt` - `@vuestic/nuxt` module for Nuxt3.",
      "`packages/sandbox` - Package for testing build and treeshaking.",
      "`packages/tailwind` - Tailwind utilities.",
      "`packages/ag-grid-theme` - AgGrid extension styles.",
      "`packages/vue-cli-plugin` - vue add vuestic-ui plugin for vue-cli [deprecated].",
      "`packages/bundlers-tests` - package used for testing vuestic ui in different bundlers in CI.",
      "`packages/deploy` - Release scripts for core contributors.",
    ]),
    block.paragraph("Likely you will deal only with `ui` and `docs` packages."),

    block.subtitle("Branches"),
    block.list([
      "Public branches (**epicmax/vuestic-ui**):\n  * `master` - releases and hotfixes only. Do not submit PR's to `master`!\n  * `develop` - main development branch.",
      "Local branches\n  * For local branches prepend your messages with `feat/` or `fix/` (e.g. for a tabs-related fix it would be `fix/tabs`, `feat/date-picker` or `fix#1000/important-bug`). This is necessary to keep local branches visually separated from the public ones.",
    ]),

    block.subtitle("Commonly used scripts"),
    block.list([
      "`yarn serve:storybook` - this will run project with demos, where you can test component features.",
      "`yarn serve:docs` - this will run project with docs (deployed here [vuestic.dev](https://vuestic.dev)).",
      "`yarn build` - this will build vuestic-ui package.",
    ]),
    block.paragraph("You can find more scripts in `package.json` of each package."),

    block.subtitle("Component folder structure"),
    block.link(
      "See detailed guide here.",
      "https://github.com/epicmaxco/vuestic-ui/issues/1907"
    ),

    block.subtitle("Pull Request Guidelines"),
    block.list([
      "The `master` branch keeps the latest stable release plus potentially some cherry-picked hotfixes. All the development should be conducted in local branches (fork of the project).",
      "**Do not submit PRs against the `master` branch.** Use the `develop` one instead.",
      "Checkout a `feat/*` branch from the `develop`, then create a pull request to `develop`.",
      "It's OK to have multiple small commits as you work on your PR - we will let GitHub automatically squash them into a single one before merging.",
      "If fixing a bug:\n  * If you are resolving a certain issue, add `closes #<xxx>[,#<yyy>]` (<xxx>, <yyy> is the related issues' ids) into the PR's description so that GitHub could [automatically close](https://docs.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword)[[target=_blank]] the related issue(s) as soon as the respective commits are merged into the `master` branch (i.e. as soon as a new version of Vuestic UI is out).\n  * Provide detailed description of the bug inside the PR in case the bug is not arranged in the form of a separate issue."
    ]),

    block.subtitle("For the core contributors"),
    block.list([
      "Always link a PR to its related issue (via `closes #123`).",
      "When you start working on a task - please self-assign the related issue. We don't want a lot of people working simultaneously on the same thing (except when intentional).",
      "For small issues you may push to the `develop` branch directly while adding `closes #123` to the commit message.",
      "For breaking changes add the word BREAKING to PR name, that would allow us to automatically find it before release.",
      "Create a single PR for one issue. If we have several PRs - move all the code into a single PR and close the rest. If one PR covers several issues - either split it in several PRs or mark one of the issues as duplicate.",
      "Make sure to assign an issue to only a single person.",
      "Check your code: [conventions](https://github.com/epicmaxco/vuestic-ui/blob/master/packages/docs/conventions.md)[[target=_blank]].",
      "We use [yarn](https://yarnpkg.com/lang/en/)[[target=_blank]] for package management.",
      "Be proactive. If you think something is wrong - create an issue or discuss.",
      "Recommended tools: [GitKraken](https://www.gitkraken.com/)[[target=_blank]], [WebStorm](https://www.jetbrains.com/webstorm/)[[target=_blank]], [ShareX](https://getsharex.com/)[[target=_blank]].",
      `If you work on UI components - work in [storybook](${process.env.VITE_STORYBOOK_HOSTNAME})[[target=_blank]] environment (\`yarn serve:storybook\`). We want to keep global stuff out of components.`
    ]),

    block.subtitle("Credits"),
    block.paragraph("[Hall of fame!](https://github.com/epicmaxco/vuestic-ui/graphs/contributors)[[target=_blank]]"),
  ],
});
