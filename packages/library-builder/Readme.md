# LibraryBuilder

This library provides tools and plugins for building UI libraries.

## Why you should use this library?
There are few thing to consider when building UI library:
- Components must be tree-shakable (both JS and CSS).
- Components must be optimized for SSR.
- Library must provide Nuxt support.
- Web components (*)

## Recommended project structure

- src
  - components
    - [component-name]
      - [component-name].vue
  - composables
  - nuxt (can be changed with nuxtDir argument)
    - runtime
      - plugin.ts
    module.ts
  - utils
  
## Nuxt module

Nuxt module must have `module.ts` in the root folder. 
`runtime` folder will be copied to dist and will be available for `module.ts` to load `plugins`.

To correctly resolve library in development and build you can use `// @replace-next-line: ` compiler macro.

```ts
// @replace-next-line: import { createVuestic } from 'vuestic-ui'
import { createVuestic } from '../main.ts'
```

[See example](./tests/demo/src/nuxt)