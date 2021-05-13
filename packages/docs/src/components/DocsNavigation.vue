<template>
  <div class="docs-navigation">
    <va-button
      flat
      size="small"
      class="docs-navigation__button"
      color="gray"
      @click="copy"
    >
      <i class="docs-navigation__button__icon" :class="copyIcon"/>
      <span class="docs-navigation__button__text">{{ copyText }}</span>
    </va-button>

    <va-button
      v-for="(link, index) in links" :key="index"
      flat
      size="small"
      class="docs-navigation__button"
      color="gray"
      :href="link.url"
      target="_blank"
    >
      <i class="docs-navigation__button__icon" :class="link.icon"/>
      <span class="docs-navigation__button__text">{{ link.text }}</span>
    </va-button>

    <form :action="sandboxDefineUrl" method="POST" target="_blank">
      <input type="hidden" name="parameters" :value="sandboxParams"/>
      <va-button
        flat
        type="submit"
        size="small"
        class="docs-navigation__button"
        color="gray"
      >
        <i class="docs-navigation__button__icon" :class="codeIcon"/>
        <span class="docs-navigation__button__text">Open in CodeSandbox</span>
      </va-button>
    </form>
  </div>
</template>

<script>
import { getParameters } from 'codesandbox/lib/api/define'
import packageUi from '../../../ui/package'

export default {
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
      links: [
        {
          text: 'Open in GitHub',
          icon: 'fa fa-github',
          url: `https://github.com/epicmaxco/vuestic-ui/tree/develop/packages/vue-cli-docs/src/wexamples/${this.gitUrl}.vue`,
        },
      ],
      copyIcon: 'fa fa-files-o',
      codeIcon: 'fa fa-code',
      copyText: 'Copy code',
    }
  },
  methods: {
    copy () {
      this.$clipboard(this.code)
      this.copyIcon = 'fa fa-check'
      this.copyText = 'Copied'
      setTimeout(() => {
        this.copyText = 'Copy code'
        this.copyIcon = 'fa fa-files-o'
      }, 1500)
    },
  },
  computed: {
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
      const html = '<div id="app"></div>'

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
@import "~vuestic-ui/src/components/vuestic-sass/resources/resources";

.docs-navigation {
  background: $prism-background;
  margin: 0.2rem 0;
  border-radius: 0.25rem;

  &__button {
    padding: 1.5rem 0.5rem;
    margin: 0 0.5rem;
    font-weight: bold;

    &:hover {
      background: none !important;
      opacity: 0.7;
    }

    &:focus {
      background: none !important;
      opacity: 0.7;
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
