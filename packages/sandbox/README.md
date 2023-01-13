# Sandbox

<p align="center"><img src="https://img.shields.io/github/package-json/v/epicmaxco/vuestic-ui?filename=packages%2Fbundlers-tests%2Fpackage.json&label=bundlers-tests"></p>

This package exists to help you testing `vuestic-ui` with vite (rollup), vue-cli (webpack) and nuxt.
It uses `vuestic-ui` package as node module.

### How it works
Before run this package, go to `ui` package and run `yarn build` command or run:
`bash ./build-vuestic-ui.sh`

> [info]
> Notice that you testing here builds of `vuestic` and `@vuestic/nuxt` packages. Don't forget to build vuestic before test.

- `yarn` - install dependencies. `vuestic-ui` should be installed from `packages/vuestic-ui` folder.
- `ci` - will build `vuestic`, `@vuestic/nuxt` and ./src with `vite`, `vue-cli`, `nuxt` and test for tree-shaking.
- `yarn build` - create bundles using `vue-cli`, `vite` and `nuxt` 
- `yarn build:vite`
- `yarn build:vue-cli`
- `yarn build:nuxt`
- `yarn build:vuestic` - builds `vuestic` dist that will be used in `vite`, `vue-cli` and `nuxt`
- `yarn build:vuestic-nuxt` - builds `@vuestic/nuxt` package
- `yarn dev:vite` - run `./src` project in dev mode using vite
- `yarn dev:vue-cli` - run `./src` project in dev mode using vue-cli (webpack)
- `yarn dev:nuxt` - run `./src` project in dev mode using nuxt
- `yarn serve:vite` - serve builded `./dist/vite` project in production mode using vite
- `yarn serve:vue-cli` -  serve builded `./dist/vue-cli` project in production mode using vue-cli (webpack)
- `yarn serve:nuxt` -  serve builded `./dist/nuxt` project in production mode using nuxt
- `yarn test` - run tests

### Tests

Tests only can guarantee that tree-shaking is working.

> Before build, please, check how project runs using `dev:vite`, `dev:vue-cli`, `serve:vite`, `server:vue-cli` before release.

Later we can write some e2e tests


### Analysis

`yarn build:analysis` makes build with tree-shaking.md file, where store information about bundle sizes
use `yarn build:analysis --use-cache` if you want to generated tree-shaking.md only if it doesn't exists already.