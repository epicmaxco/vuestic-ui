export default definePageConfig({
  blocks: [
    block.title('Web components'),
    block.alert('This feature is currently in test mode. You can use it, but there can be unexpected bugs or we can change API in future. Help use improve it!', 'warning'),
    block.paragraph('Vuestic UI provides web-components build, so you can pick some component and use them without Vue application'),

    block.subtitle('Installation'),
    block.paragraph('Web components build shiped within `vuestic-ui` package and can be imported with suffix `vuestic-ui'),
    block.paragraph('Before you can use web-components they must be registered with `window.customElement`. We provide a nice helper, so you can register specific components:'),
    block.link('See \"Install Vuestic UI\"', '/getting-started/installation#manual-installation'),
    block.code('install-ts'),

    block.subtitle('CSS'),
    block.paragraph('Since Custom Elements have their own scoped CSS in Shadow DOM, there might be a case when you want to provide some CSS to components. You can do this with `css` property in `registerVuesticWebComponents`. For example, if you want to use Font Awesome in Vuestic components you need provide this CSS:'),
    block.code('install-css'),

    block.subtitle('Usage example'),
    block.paragraph('We use Vuestic web component with vanilla Vite project here'),
    block.paragraph('First, we need to register Custom Elements'),
    block.code('example-register-ts'),
    block.paragraph('Then we can use them in our HTML'),
    block.code('example-html'),
    block.paragraph('You can also use Global Config with VaConfig element'),
    block.code('example-global-config'),
    block.link('See more detailed example in our Sandbox', 'https://github.com/epicmaxco/vuestic-ui/tree/develop/packages/sandbox/web-components'),

    block.subtitle('Tree shaking'),
    block.paragraph('You can import and register only specific components that you need and your bundler will tree-shake other components. It also removes our default CSS in case you don\'t want ot use Material Icons.'),
    block.code('treeshaking'),
  ]
})
