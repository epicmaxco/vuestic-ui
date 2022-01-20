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

<script lang="ts">
import { computed, defineComponent, PropType, ref, Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { CodesandboxConfig } from '../types/configTypes'
import getCodesandboxExample from '../helpers/CodeSandboxExample'
import { applyTranslations } from '../helpers/TranslationsHelper'

const query = '?query=file=/src/App.vue'

type ButtonStates = 'active' | 'error' | 'default'

export default defineComponent({
  name: 'DocsNavigation',
  props: {
    code: { type: String as PropType<string>, default: '' },
    config: { type: Object as PropType<CodesandboxConfig>, default: () => ({}) },
    gitUrl: { type: String as PropType<string>, default: '' },
    gitComponent: { type: String as PropType<string>, default: '' },
  },
  setup (props) {
    const { t } = useI18n()

    const copyButtonState: Ref<ButtonStates> = ref('default')
    const copy = async () => {
      try {
        await window.navigator.clipboard.writeText(props.code)
        copyButtonState.value = 'active'
      } catch (e: any) {
        if (e.message === 'NotAllowedError') {
          copyButtonState.value = 'error'
        }
      }

      setTimeout(() => { copyButtonState.value = 'default' }, 1500)
    }

    const buttonStates = {
      active: { text: t('docsNavigation.copyCopied'), icon: 'fa fa-check' },
      error: { text: t('docsNavigation.copyFailure'), icon: 'fa fa-times' },
      default: { text: t('docsNavigation.copyCode'), icon: 'fa fa-files-o' },
    }
    const copyButton = computed(() => buttonStates[copyButtonState.value])

    const sandboxDefineUrl = computed(() => `https://codesandbox.io/api/v1/sandboxes/define${query}`)
    const sandboxParams = computed(() => getCodesandboxExample(applyTranslations(props.code), props.config))
    const gitLink = computed(
      () => `https://github.com/epicmaxco/vuestic-ui/tree/develop/packages/docs/src/page-configs/${props.gitUrl}/examples/${props.gitComponent}.vue`,
    )

    return {
      copy,
      copyButton,
      sandboxDefineUrl,
      sandboxParams,
      gitLink,
    }
  },
})
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
