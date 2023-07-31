# LibraryBuilder

This library provides tools and plugins for building UI libraries.

## Why you should use this library build tool?
There are few thing to consider when building UI library:
- Components must be tree-shakable (both JS and CSS).
- Components must be optimized for SSR.
- Library must provide Nuxt support.
- It must be easy and fast to build as UI library for Vuejs.
- Generates correct `exports` in `package.json`, so library works within any bundler and components are tree-shakable

Library produces builds:
- cjs - for node (SSR like vite-ssr)
- iife - for browsers
- es - for bundlers (like Vite)
- esm-node - for bundlers, but without vue and css plugins (pure Rollup)
- nuxt - nuxt module for nuxt3
- web-components - ES build optimized to be used as web-components (not ready for production usage yet)
- types - ts types
- styles - compiled css styles

## Usage
As a CLI:
```bash
  library-build
```
Arguments:
- entry - path to main.ts file. Default `./src/main.ts`
- nuxtDir - path to nuxt folder where `module.ts` and `runtime` folder are stored. Default: entry file dir + `./nuxt`
- outDir - path where to put output files. Default `./dist`

As a library: (not ready yet)

## Recommended project structure

- 📁 src
  - 📁 components
    - 📁 [component-name]
      - 📄 [component-name].vue
  - 📁 composables
  - 📁 nuxt (can be changed with nuxtDir argument)
    - 📁 runtime
      - 📄 plugin.ts
    - 📄 module.ts
  - 📁 utils
  - 📁 styles (*)
  
## Nuxt module

Nuxt module must have `module.ts` in the root folder. 
`runtime` folder will be copied to dist and will be available for `module.ts` to load `plugins`.

To correctly resolve library in development and build you can use `// @replace-next-line: ` compiler macro.

```ts
// @replace-next-line: import { createVuestic } from 'vuestic-ui'
import { createVuestic } from '../main.ts'
```

[See example](./tests/demo/src/nuxt)