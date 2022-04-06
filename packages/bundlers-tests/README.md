# Bundlers tests

<p align="center"><img src="https://img.shields.io/github/package-json/v/epicmaxco/vuestic-ui?filename=packages%2Fbundlers-tests%2Fpackage.json&label=bundlers-tests"></p>

This package exists to help you testing `vuestic-ui` with vite (rollup) and vue-cli (webpack).
It uses `vuestic-ui` package as node module.

### How it works
Before run this package, go to `ui` package and run `yarn build` command or run:
`bash ./build-vuestic-ui.sh`

- `yarn` - install dependencies. `vuestic-ui` should be installed from `packages/vuestic-ui` folder.
- `yarn test` - run tests that before create bundles using `vue-cli` and `vite`.
- `yarn build` - create bundles using `vue-cli` and `vite
- `yarn build:vite`
- `yarn build:vue-cli`
- `yarn dev:vite` - run `./src` project in dev mode using vite
- `yarn dev:vue-cli` - run `./src` project in dev mode using vue-cli (webpack)
- `yarn serve:vite` - server `./dist/vite` project in production mode using vite
- `yarn serve:vue-cli` - server `./dist/vue-cli` project in production mode using vue-cli (webpack)

### Tests

Tests only can guarantee that tree-shaking is working.

> Before build, please, check how project runs using `dev:vite`, `dev:vue-cli`, `serve:vite`, `server:vue-cli` before release.

Later we can write some e2e tests