<template>
  <div class="docs-navigation">
    <va-button
      v-if="!hideShowCodeButton"
      preset="secondary"
      size="small"
      class="docs-navigation__button"
      color="gray"
      @click="showCodeComputed = !showCodeComputed"
    >
      <va-icon class="docs-navigation__button__icon" name="fa4-code" size="13px" />
      <span class="docs-navigation__button__text"> {{ showCode ? $t('docsExample.hideCode') : $t('docsExample.showCode') }}</span>
    </va-button>

    <va-button
      preset="secondary"
      size="small"
      class="docs-navigation__button"
      color="gray"
      @click="copy"
    >
      <va-icon class="docs-navigation__button__icon" :name="copyButton.icon" size="13px" />
      <span class="docs-navigation__button__text">{{ copyButton.text }}</span>
    </va-button>

    <va-button
      preset="secondary"
      size="small"
      class="docs-navigation__button"
      color="gray"
      :href="gitLink"
      target="_blank"
    >
      <va-icon class="docs-navigation__button__icon fa fa-github" size="13px" />
      <span class="docs-navigation__button__text">{{ $t('docsNavigation.openGithub') }}</span>
    </va-button>

    <form :action="sandboxDefineUrl" method="POST" target="_blank">
      <input type="hidden" name="parameters" :value="sandboxParams" />
      <va-button
        preset="secondary"
        type="submit"
        size="small"
        class="docs-navigation__button"
        color="gray"
      >
        <va-icon class="docs-navigation__button__icon" size="13px">
          <svg width="13" height="13" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 88h88V0H0v88Zm79-9V9H9v70h70Z" /></svg>
        </va-icon>
        <span class="docs-navigation__button__text">{{ $t('docsNavigation.openCodeSandbox') }}</span>
      </va-button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, PropType, ref, Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { CodesandboxConfig } from '../types/configTypes'
import getCodesandboxExample from '../helpers/CodeSandboxExample'
import { applyTranslations } from '../helpers/TranslationsHelper'
import { getWindow } from 'vuestic-ui/src/utils/ssr-utils'

const query = '?query=file=/src/App.vue'

type ButtonStates = 'active' | 'error' | 'default'

const props = defineProps({
  code: { type: String, default: '' },
  config: { type: Object as PropType<CodesandboxConfig>, default: () => ({}) },
  gitUrl: { type: String, default: '' },
  gitComponent: { type: String, default: '' },
  showCode: { type: Boolean, required: true },
  hideShowCodeButton: { type: Boolean, default: false },
})

const emit = defineEmits(['update:showCode'])

const { t } = useI18n()

const showCodeComputed = computed({
  get () { return props.showCode },
  set (newValue) { emit('update:showCode', newValue) },
})

const copyButtonState: Ref<ButtonStates> = ref('default')
const copy = async () => {
  try {
    await getWindow()?.navigator.clipboard.writeText(props.code)
    copyButtonState.value = 'active'
  } catch (e: any) {
    if (e.message === 'NotAllowedError') {
      copyButtonState.value = 'error'
    }
  }

  setTimeout(() => { copyButtonState.value = 'default' }, 1500)
}

const buttonStates = {
  active: { text: t('docsNavigation.copyCopied'), icon: 'fa4-check' },
  error: { text: t('docsNavigation.copyFailure'), icon: 'fa4-times' },
  default: { text: t('docsNavigation.copyCode'), icon: 'fa4-files-o' },
}
const copyButton = computed(() => buttonStates[copyButtonState.value])

const sandboxDefineUrl = computed(() => `https://codesandbox.io/api/v1/sandboxes/define${query}`)
const sandboxParams = computed(() => getCodesandboxExample(applyTranslations(props.code), props.config))
const gitLink = computed(
  () => `https://github.com/epicmaxco/vuestic-ui/tree/develop/packages/docs/src/page-configs/${props.gitUrl}/examples/${props.gitComponent}.vue`,
)
</script>

<style lang="scss">
  @import "~vuestic-ui/src/styles/resources";

  .docs-navigation {
    background: $prism-background;
    margin: 0 0 0.2rem 0;
    border-radius: 0.25rem;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding: 0 calc(var(--va-card-padding) - var(--va-button-sm-content-px) / 2);
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    &__button {
      padding: 0.5rem 0rem;
      margin-right: 0.25rem;
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
