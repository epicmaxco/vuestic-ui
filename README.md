<p align="center">
  <a href="https://vuestic.dev" target="_blank">
      <img alt="Vuestic UI Logo" width="400" src="https://user-images.githubusercontent.com/29167241/208700497-c356a0eb-338f-46cc-a2ca-4a892df7e446.png">
  </a>
      <br>
  Vue.js 3.0 UI Library
  <br>
  Developed by <a href="https://epicmax.co">Epicmax</a>. Designed by
  <a href="https://twitter.com/xxsavitski">Vasili Savitski</a>.
  <br>
</p>

<p align="center">
  <a href="https://github.com/epicmaxco/vuestic-ui/tree/develop/packages/extensions/ag-grid-theme">
    <img src="https://img.shields.io/npm/v/@vuestic/ag-grid-theme?label=ag-grid-theme">
  </a>
  <a href="https://github.com/epicmaxco/vuestic-ui/tree/develop/packages/vue-cli-plugin">
    <img src="https://img.shields.io/npm/v/vue-cli-plugin-vuestic-ui?label=vue-cli-plugin">
  </a>
</p>

<p align="center">
  <a href="https://app.circleci.com/pipelines/github/epicmaxco/vuestic-ui">
    <img src="https://img.shields.io/circleci/build/github/epicmaxco/vuestic-ui/develop" alt="CI badge">
  </a>
  <a href="https://github.com/epicmaxco/vuestic-ui/blob/develop/LICENSE.MD">
    <img src="https://img.shields.io/npm/l/vuestic-ui.svg" alt="License">
  </a>
  <a href="https://www.npmjs.com/package/vuestic-ui">
    <img src="https://img.shields.io/github/package-json/v/epicmaxco/vuestic-ui?filename=packages%2Fui%2Fpackage.json" alt="Version">
  </a>
</p>

<p align="center">
  <a href="https://vuestic.dev/">Documentation</a>
  |
  <a href="https://discord.gg/u7fQdqQt8c">Discord</a>
</p>

> Vuestic UI is forever free and open to contributions. See our
<a href="https://github.com/epicmaxco/vuestic-ui/issues">issues</a>,
<a href="https://vuestic.dev/en/contribution/guide">contributing guide</a> and join discussions on our
<a href="https://discord.gg/u7fQdqQt8c">Discord</a> to help us improve Vuestic UI experience.

  <p align="center">
    <img src=".github/assets/vuestic-ui-image.jpg">
  </p>

### Why use Vuestic UI?

- Vue.js 3.0 compatible
- Accessibility
- Dark Theme support
- Feature-rich: more than 60 customizable components
- Two built-in color scheme presets
- Powerful configurations:
    - Local - configure components in-depth
    - Global - configure framework overall
- Cross-browser and responsive
- i18n-ready
- MIT license

### Installation

First, make sure you have all prerequisites installed:

* [Node.js](https://nodejs.org/en/) ( >=14.*)
* [npm](https://www.npmjs.com/get-npm) version 3+ (
  or [yarn](https://yarnpkg.com/lang/en/docs/install) version 1.16+)
  and [Git](https://git-scm.com).

After checking the prerequisites, install Vuestic UI via npm/yarn:

```shell
npm install vuestic-ui
//or
yarn add vuestic-ui
```

### Quick start

Make sure you've imported both styles and plugin into your entry file:

```javascript
//main.js
import { createApp } from 'vue'
import App from './App.vue'
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'

createApp(App)
  .use(createVuestic())
  .mount('#app')
```

### Documentation

Information, guides and tutorials are available
on [vuestic.dev](https://vuestic.dev)

### Partners & Sponsors ❤️
<div>
  <a href="https://vuejs.org/partners/epicmax.html" target="_blank" title="VueJS - The Progressive JavaScript Framework">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./.github/assets/vuejs-light.svg" />
      <img src="./.github/assets/vuejs.svg" loading="lazy" alt=""/>
    </picture>
  </a>
  <a href="https://nuxt.com/support/agencies/epicmax" target="_blank" title="Nuxt - The Intuitive Web Framework">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./.github/assets/nuxt-light.svg" />
      <img hspace="15" src="./.github/assets/nuxt.svg" loading="lazy" alt=""/>
    </picture>
  </a>
  <a href="https://epicmax.co/" target="_blank" title="Epicmax - Top Vue.js Development Company"><img src="./.github/assets/epicmax.svg" loading="lazy" alt=""></a>
  <br />
  <br />
  <a href="https://www.ag-grid.com/" target="_blank" title=" Data Grid: AG Grid: High-Performance React Grid, Angular Grid, JavaScript Grid">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./.github/assets/aggrid-light.svg" />
      <img src="./.github/assets/aggrid.svg" loading="lazy" alt=""/>
    </picture>
  </a>
  <a href="https://vuejobs.com/" target="_blank" title="Vue.js jobs – Browse through dozens of Vue.js openings">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./.github/assets/vuejobs-light.svg" />
      <img hspace="15" src="./.github/assets/vuejobs.svg" loading="lazy" alt=""/>
    </picture>
  </a>
  <a href="https://flatlogic.com/" target="_blank" title="Flatlogic - The best way to create React, Angular and Vue full-stack web applications">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./.github/assets/flatlogic-light.svg" />
      <img src="./.github/assets/flatlogic.svg" loading="lazy" alt=""/>
    </picture>
  </a>
</div>
<br />

Become a partner: [hello@epicmax.co](mailto:hello@epicmax.co)

### Community

Ask questions at the official
community [discord server](https://discord.gg/u7fQdqQt8c)

### Vuestic Admin

See Vuestic UI library in
action. [Vuestic Admin](https://github.com/epicmaxco/vuestic-admin) is a great
example of a real-world web application based on Vuestic UI.

### Contributing

Thanks for all your wonderful PRs, issues and ideas.
<a href="https://github.com/epicmaxco/vuestic-ui/graphs/contributors">
<img src="https://opencollective.com/vuestic-ui/contributors.svg?width=890&button=false" />
</a>
<br>
You’re always welcome to join: check out
our <a href="https://vuestic.dev/en/contribution/guide">
contribution guides</a>
, [open issues](https://github.com/epicmaxco/vuestic-ui/issues)
and [discord server](https://discord.gg/u7fQdqQt8c)

### Browsers support

We design Vuestic UI to support the latest modern web browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" /><br>IE/Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" /><br>Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /><br>Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" /><br>Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" /><br>Opera |
| --- | --- | --- | --- | --- |
| Edge | last 2 versions  | last 2 versions | last 2 versions | last 2 versions |

### Can I hire you guys?
[Epicmax](https://epicmax.co) is committed to Open Source from its beginning.
[Vuestic UI](https://vuestic.dev) was created and backed by Epicmax, and is supported through all the years. 
You can request a consultation or order web development services by Epicmax via this [form](https://epicmax.co/contacts) 😎

Say hi: <a href="mailto:hello@epicmax.co">hello@epicmax.co</a>. We will be happy to work with you! 

[Other work](https://epicmax.co) we’ve done 🤘

[Meet the Team](https://vuestic.dev/team)

### Follow us

Stay up to date with the latest Vuestic news! Follow us
on [Twitter](https://twitter.com/vuestic_ui)
or [Linkedin](https://www.linkedin.com/company/18509340)

### License

[MIT](https://github.com/epicmaxco/vuestic-ui/blob/develop/LICENSE.MD) license.
