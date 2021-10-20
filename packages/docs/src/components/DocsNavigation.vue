<template>
  <div class="docs-navigation">
    <va-button
      flat
      size="small"
      class="docs-navigation__button"
      color="gray"
      @click="copy"
    >
      <va-icon class="docs-navigation__button__icon" :class="copyButton.icon" size="sm" />
      <span class="docs-navigation__button__text">{{ copyButton.text }}</span>
    </va-button>

    <va-button
      flat
      size="small"
      class="docs-navigation__button"
      color="gray"
      :href="gitLink"
      target="_blank"
    >
      <va-icon class="docs-navigation__button__icon fa fa-github" size="sm" />
      <span class="docs-navigation__button__text">{{ $t('docsNavigation.openGithub') }}</span>
    </va-button>

    <form :action="sandboxDefineUrl" method="POST" target="_blank">
      <input type="hidden" name="parameters" :value="sandboxParams" />
      <va-button
        flat
        type="submit"
        size="small"
        class="docs-navigation__button"
        color="gray"
      >
        <va-icon class="docs-navigation__button__icon fa fa-code" size="sm" />
        <span class="docs-navigation__button__text">{{ $t('docsNavigation.openCodeSandbox') }}</span>
      </va-button>
    </form>
  </div>
</template>

<script>
import { getParameters } from 'codesandbox/lib/api/define'
import packageUi from '../../../ui/package'

export default {
  name: 'DocsNavigation',
  props: {
    code: {
      type: String,
      default: '',
    },
    gitUrl: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      query: '?query=file=/src/App.vue',
      copyButtonState: 'default',
    }
  },
  methods: {
    async copy () {
      try {
        await window.navigator.clipboard.writeText(this.code)
        this.copyButtonState = 'active'
      } catch (e) {
        if (e.message === 'NotAllowedError') {
          this.copyButtonState = 'error'
        }
      }
      setTimeout(() => {
        this.copyButtonState = 'default'
      }, 1500)
    },
  },
  computed: {
    copyButton () {
      const buttonStates = {
        active: { text: this.$t('docsNavigation.copyCopied'), icon: 'fa fa-check' },
        error: { text: this.$t('docsNavigation.copyFailure'), icon: 'fa fa-times' },
        default: { text: this.$t('docsNavigation.copyCode'), icon: 'fa fa-files-o' },
      }
      return buttonStates[this.copyButtonState]
    },
    gitLink () {
      return `https://github.com/epicmaxco/vuestic-ui/tree/develop/packages/docs/src/examples/${this.gitUrl}.vue`
    },
    sandboxDefineUrl () {
      return `https://codesandbox.io/api/v1/sandboxes/define${this.query}`
    },
    sandboxParams () {
      const main = `import { createApp } from "vue";
import App from "./App.vue";
import { VuesticPlugin } from "vuestic-ui";
import 'vuestic-ui/dist/vuestic-ui.css'

const app = createApp(App);
app.use(VuesticPlugin);
app.mount("#app");
`
      const babel = `module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}`
      const html = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Code+Pro:400">
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<div id="app"></div>`

      return getParameters({
        files: {
          'package.json': {
            content: {
              scripts: {
                serve: 'vue-cli-service serve',
              },
              dependencies: {
                'core-js': '^3.6.5',
                vue: '^3.0.0',
                'vuestic-ui': `${packageUi.version}`,
              },
              devDependencies: {
                '@vue/cli-plugin-babel': '~4.5.0',
                '@vue/cli-service': '~4.5.0',
                '@vue/compiler-sfc': '^3.0.0',
              },
            },
          },
          'babel.config.js': {
            content: babel,
          },
          'src/main.js': {
            content: main,
          },
          'src/App.vue': {
            content: this.code,
          },
          'public/index.html': {
            content: html,
          },
        },
      })
    },
  },
}
</script>

<style lang="scss">
@import "~vuestic-ui/src/styles/resources";

.docs-navigation {
  background: $prism-background;
  margin: 0.2rem 0;
  border-radius: 0.25rem;

  &__button {
    padding: 1.5rem 0.5rem;
    margin: 0 0.5rem;
    font-weight: bold;

    div {
      color: var(--va-gray);
    }

    &:hover {
      background: none !important;
      opacity: 0.7;
    }

    &:focus {
      background: none !important;
      opacity: 0.7;
      box-shadow: none !important;
    }

    &__icon {
      font-style: normal !important;
      margin-right: 0.5rem;
    }
  }

  form {
    display: inline-flex;
  }
}
</style>
