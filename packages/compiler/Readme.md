# Vuestic Plugin

Combination of bundling tools focusing on improving development experience when working with Vuestic UI

## Installation

1. Install package 

```bash
npm i @vuestic/compiler@latest
```

2. Add `vuestic` plugin to vite config.

`vite.config.ts` or `vite.config.js`
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { vuestic } from '@vuestic/compiler/vite'

export default defineConfig({
  plugins: [
    vuestic(),
    vue(),
  ],
})
```

> Make sure to register vuestic plugin before `vue`

## List of features

### Devtools

Devtools designed for intuitive visual control over application with Vuestic components

#### Usages

Run vite project in dev mode
Press ALT/Option + F12 in browser

#### Plans

- [x] Edit component props
- [x] Edit component slot content
  - [] Add new slots
- [] Add new components
- [] Control layout
- [] Add event listeners

### CSS layers

Build plugin that allows controlling CSS order

### Typescript auto-completion from config

UNDER DEVELOPMENT

Adds TS global types for colors, icons, etc.