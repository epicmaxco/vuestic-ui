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
import getCodesandboxExample from '../helpers/CodeSandboxExample'

export default {
  name: 'DocsNavigation',
  props: {
    code: {
      type: String,
      default: '',
    },
    config: {
      type: Object,
      default: () => ({}),
    },
    gitUrl: {
      type: String,
      default: '',
    },
    gitComponent: {
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
      return `https://github.com/epicmaxco/vuestic-ui/tree/develop/packages/docs/src/${this.gitUrl}/examples/${this.gitComponent}.vue`
    },
    sandboxDefineUrl () {
      return `https://codesandbox.io/api/v1/sandboxes/define${this.query}`
    },
    sandboxParams () {
      return getCodesandboxExample(this.code, this.config)
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
