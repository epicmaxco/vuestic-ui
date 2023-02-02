# Vuestic UI docs

Vuestic UI docs is a Nuxt3 project made with VuesticUI, Tailwind, i18n, NuxtImage and custom page-config plugin.

## @vuestic/nuxt

We use `@vuestic/nuxt` package from `packages/nuxt` with a little modifications. We resolve vuestic-ui paths in monorepo to `packages/ui`.
List of aliases you can find in `~/modules/vuestic.ts`.

## page-config
Page config is text-based CMS to define page look.
Page content defined in `blocks` array, which consists of page-config/blocks.
You can set page title, description in `meta`.
Configs are stored in `~/page-configs/[category]` directory.

There a lof defined blocks that you can use to make a page:

| block | usage | description |
| --- | --- | --- |
| alert | `block.alert('translation.path', 'success')` | VaAlert component with text
| api | `block.api('VaButton')` | VaButton API section. Props, Events, Methods and Slots table will be generated automatically from VaButton component
| code | `block.code('installation')` | Renders /code/[fileName].[ext] file content in code view with syntax highlight. Ext resolved automatically.
| component | `block.component('Playground')` | Renders component from /components/[componentName].vue
| example | `block.example('WithLoading')` | Render example from /examples/[exampleName].vue. It shows example title, text and code. Translations resolved from [pageConfig].examples.[exampleName].['title' or 'text']
| title | `block.title('button.title')` | Renders `h1`
| subtitle | `block.subtitle('all.examples')` | Renders `h2`
| headline | `block.headline('button.style.title')` | Renders `h3`
| paragraph | `block.paragraph('button.summaryText')` | Renders `p`
| And more! | See all blocks: `~/modules/page-config/blocks` |
> Some of blocks are simple, some of them complex - use compiler to resolve components and other files.
## Tailwind
We use `@nuxtjs/tailwindcss` plugin. 
Try to use as much as you can less of tailwind in demos that will be visible to user, so demo can be easy copied into user's project
without Tailwind.

## i18n
We use `@nuxtjs/i18n` nuxt module.
All locales stored in `~/locales/`. Locales structure for now a little mess, but it looks like this:
```ts
{
  // All translations used in landing
  landing: { ... }, 
  // Component API translations
  api: {
    [VaComponentName]: {
      props: { ... },
      slots: { ... },
      events: { ... },
      methods: { ... }
    }
    all: { // Fallback if component name not found
      props: { ... },
      slots: { ... },
      events: { ... },
      methods: { ... }
    },
  },
  [pageConfigName]: {
    title: ... ,
    summaryText: ... ,
    examples: {
      [exampleName]: {
        title: ... ,
        text: ... ,
      }
    }
  }
}
```

## Assets

We use nuxt-img to load images from `~/assets/images`. Example:
```vue
<nuxt-img src="/landing/image-open-source.png" height="500px" width="500px" />
```

Prefer to set image sizes and [optimize](tinypng.com/) it.
