<p align="center">
  <a href="https://vuestic.dev" target="_blank">
      <img alt="Vuestic UI Logo" width="400" src="packages/ui/src/assets/vuestic-ui-logo.png">
  </a>
      <br>
  Vue.js 3.0 UI Library
  <br>
  Developed by <a href="https://epicmax.co">Epicmax</a>. Designed by
  <a href="https://xxsavitski.com/">Vasili Savitski</a>.
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
    <img src="./packages/ui/src/assets/vuestic-ui-image.jpg">
  </p>

### Why use Vuestic UI?

- Vue.js 3.0 compatible
- MIT license
- Feature-rich: more than 52 customizable components
- Two built-in color scheme presets
- Powerful configurations:
    - Local - configure components in-depth
    - Global - configure framework overall
- Cross-browser and responsive
- i18n-ready

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
import { VuesticPlugin } from 'vuestic-ui' //(✓)
import 'vuestic-ui/dist/vuestic-ui.css' //(✓)
//...
const app = createApp(App)
app.use(VuesticPlugin) //(✓)
//...
```

### Documentation

Information, guides and tutorials are available
on [vuestic.dev](https://vuestic.dev)

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

Yes! Say hi: <a href="mailto:hello@epicmax.co">hello@epicmax.co</a>
We will be happy to work with you! [Other work](https://epicmax.co) we’ve done

### Follow us

Stay up to date with the latest Vuestic news! Follow us
on [Twitter](https://twitter.com/epicmaxco)
or [Facebook](https://facebook.com/epicmaxco)

### License

[MIT](https://github.com/epicmaxco/vuestic-ui/blob/develop/LICENSE.MD) license.
