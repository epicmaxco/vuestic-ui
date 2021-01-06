<template>
  <div class="docs-navigation">
    <va-button
      flat
      size="small"
      class="docs-navigation__button"
      color="gray"
      @click="copy"
    >
      <i class="docs-navigation__button__icon" :class="copyIcon" />
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
      <i class="docs-navigation__button__icon" :class="link.icon" />
      <span class="docs-navigation__button__text">{{ link.text }}</span>
    </va-button>

    <form action="https://codesandbox.io/api/v1/sandboxes/define" method="POST" target="_blank">
      <input type="hidden" name="parameters" :value="getSandboxParams" />
      <va-button
        flat
        type="submit"
        size="small"
        class="docs-navigation__button"
        color="gray"
      >
        <i class="docs-navigation__button__icon" :class="codeIcon" />
        <span class="docs-navigation__button__text">Open in CodeSandbox</span>
      </va-button>
    </form>
  </div>
</template>

<script>
import { getParameters } from 'codesandbox/lib/api/define'

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
      links: [
        {
          text: 'Open in GitHub',
          icon: 'fa fa-github',
          url: `https://github.com/epicmaxco/vuestic-ui/tree/develop/packages/docs/examples/${this.gitUrl}.vue`,
        },
        // commented it while it's not working
        /* {
          text: 'Open in CodePen',
          icon: 'fa fa-codepen',
          url: '#',
        }, */
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
    getSandboxParams () {
      const code = `import React from 'react';
import ReactDOM from 'react-dom';

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Meck',
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);`
      const html = '<div id="root"></div>'

      const parameters = getParameters({
        files: {
          'package.json': {
            content: {
              dependencies: {
                react: 'latest',
                'react-dom': 'latest',
              },
            },
          },
          'index.js': {
            content: code,
          },
          'index.html': {
            content: html,
          },
        },
      })
      console.log(parameters)
      return parameters
    },
  },
}
</script>

<style lang="scss">
@import "../ui/src/components/vuestic-sass/resources/resources";

.docs-navigation {
  background: $prism-background;
  margin: 0.2rem 0;
  border-radius: 0.25rem;

  form {
    display: inline-block;
  }

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
}
</style>
