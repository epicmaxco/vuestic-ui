# Vue.js Contributing Guide

Hi! We are really excited that you are interested in contributing to Vuestic. Before submitting your contribution though, please make sure to take a moment and read through the following guidelines.

* [Code of Conduct](./../CODE_OF_CONDUCT.md)

## Pull Request Guidelines

* The `master` branch keeps latest stable release + cherrypicked hotfixes. All development should be done in local branches. 
* **Do not submit PRs against the `master` branch.**
* Checkout a `feat/` branch from `develop`, then create pull request against that branch.
* It's OK to have multiple small commits as you work on the PR - we will let GitHub automatically squash it before merging.
* If fixing a bug:
  * If you are resolving a special issue, add `fix #xxxx[,#xxx]` (#xxxx is the issue id) to the PR description so that github will close the issue once it's up on `master`.
  * Provide detailed description of the bug in the PR if it's not done in the issue.

### Branches

* Public branches (**epicmax/vuestic-admin**):
  * `master` - releases and hotfixes only. Do not submit PR's to `master`!.
  * `develop` - main development branch. Houses `2.0` at the moment.

* Local branches
  * For local branches prepend your messages with `feat/`, ie for tabs fix it would be `feat/fix-tabs`. This is wanted to keep local branches visually separate from public ones.

### File naming

* camelCase: `testIsContextableComponent.ts` - helpers and instants
* kebab-case: `api-options.ts` - configs
* PascalCase: `DocsCode.vue` - components, classes, types

### For core contributors

* Always link PR to issue (via `fix #123`).
* When you start working on the task - please assign yourself. That's needed to prevent conflict.
* For small issues you may push to `develop` branch directly while adding (`fix #123`) to commit message.
* Create single PR for one issue. If we have several PRs - move all the code into a single one and close the rest. If one PR covers several issues - either split it in several PRs or mark one of the issues as duplicate.
* Be sure to have only one person assigned per issue.
* Check your code: [conventions](../packages/old-docs/conventions.md).
* We use [yarn](https://yarnpkg.com/lang/en/) for package management.
* Be proactive. If you think something is wrong - create an issue or discuss.
* Recommended tools: [GitKraken](https://www.gitkraken.com/), [WebStorm](https://www.jetbrains.com/webstorm/), [ShareX](https://getsharex.com/)
* If you work on UI components - work in book environment (`yarn serve:book`). We want to keep global stuff out of components.

#### Component folder structure

Here's the component folder structure example for `va-checkbox` component.

```
va-checkbox // component directory
  |- VaCheckbox.vue // component itself
  |- VaCheckbox.demo.vue // component demo
  |- VaCheckbox.spec.js // component tests
```

Additionally you have to add docs, which you can find here: `docs/components/VaCheckbox.md`.

Here's couple of points about these files:
* Only tests are optional, documentation and demos are not. Docs and demos should also cover all supported cases.

#### Before release workflow
* Update package versions to newest ones. Update lock files (for both `npm` and `yarn`)

### Commonly used NPM scripts

``` bash
# Run vue-book dev server
$ yarn serve:book

# Generate all needed files for component (component itself, docs, tests)
$ yarn generate:component

# Build vue-book bundle
$ yarn build:book

# Lint everything
$ yarn lint

# Run tests
$ yarn test:unit

# Run vuepress dev server 
$ yarn serve:docs

# Build vuepress bundle
$ yarn build:docs
```

## Credits

<a href="https://github.com/epicmaxco/vuestic-admin/graphs/contributors">Hall of fame!</a>
