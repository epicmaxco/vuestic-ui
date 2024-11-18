<template>
  <div class="docs-navigation">
    <VaButton
      v-if="!hideShowCodeButton"
      aria-label="Show code"
      preset="secondary"
      size="small"
      class="docs-navigation__button"
      color="secondary"
      @click="showCodeComputed = !showCodeComputed"
    >
      <VaIcon
        class="docs-navigation__button__icon"
        name="fa4-code"
        size="13px"
      />
      <span class="docs-navigation__button__text"> {{ showCode ? 'Hide Code' : 'Show Code' }}</span>
    </VaButton>

    <VaButton
      aria-label="Copy code example"
      preset="secondary"
      size="small"
      class="docs-navigation__button"
      color="secondary"
      @click="copy"
    >
      <VaIcon
        class="docs-navigation__button__icon"
        :name="copyButton.icon"
        size="13px"
      />
      <span class="docs-navigation__button__text">{{ copyButton.text }}</span>
    </VaButton>

    <VaButton
      aria-label="Open in Github"
      preset="secondary"
      size="small"
      class="docs-navigation__button"
      color="secondary"
      :href="gitLink"
      target="_blank"
    >
      <VaIcon
        class="docs-navigation__button__icon fa fa-github"
        size="13px"
      />
      <span class="docs-navigation__button__text">Open in GitHub</span>
    </VaButton>

    <VaModal
      v-if="doShowPlaygroundButton"
      stateful
      fullscreen
      class="playground-modal"
      hide-default-actions
    >
      <template #anchor="{ show }">
        <VaButton
          aria-label="Open in playground"
          preset="secondary"
          size="small"
          class="docs-navigation__button"
          color="secondary"
          @click="show"
        >
          <VaIcon
            class="docs-navigation__button__icon"
            name="auto_fix_high"
            size="13px"
          />
          <span class="docs-navigation__button__text">Playground</span>
        </VaButton>
      </template>

      <ClientOnly>
        <LazyPlay
          v-model:state="sandboxState"
          class="h-full border-b-2 border-[var(--va-background-border)]"
          :code="code"
        />
      </ClientOnly>

      <template #footer="{ ok }">
        <div class="flex gap-2 w-full px-5">
          <VaInput
            v-if="$vaBreakpoint.smUp"
            :model-value="shareLink"
            label="Sandbox link"
            inner-label
            class="flex-1 w-full"
          />
          <VaSpacer v-else />
          <VaButton icon="content_copy" preset="secondary" @click="copySandboxLink">
            Copy link
          </VaButton>
          <VaButton preset="secondary" icon="close" @click="ok" />
        </div>
      </template>
    </VaModal>
    <form
      v-else
      :action="sandboxDefineUrl"
      method="POST"
      target="_blank"
    >
      <input
        type="hidden"
        name="parameters"
        :value="sandboxParams"
      >
      <VaButton
        preset="secondary"
        type="submit"
        size="small"
        class="docs-navigation__button"
        color="secondary"
      >
        <VaIcon
          class="docs-navigation__button__icon"
          size="13px"
        >
          <svg
            id="IconChangeColor"
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#737373"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-codesandbox"
          >
            <path
              id="mainIconPathAttribute"
              d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
              fill="transparent"
              stroke="#737373"
            />
            <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
            <polyline points="7.5 19.79 7.5 14.6 3 12" />
            <polyline points="21 12 16.5 14.6 16.5 19.79" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line
              x1="12"
              y1="22.08"
              x2="12"
              y2="12"
            />
          </svg>
        </VaIcon>
        <span class="docs-navigation__button__text">Open in CodeSandbox</span>
      </VaButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType, ref, Ref } from 'vue'
import { createCodeSandbox, type CodeSandboxConfig, } from '@/composables/code-sandbox'
import { getWindow } from 'vuestic-ui/src/utils/ssr'

type ButtonStates = 'active' | 'error' | 'default'

const props = defineProps({
  code: { type: String, default: '' },
  config: { type: Object as PropType<CodeSandboxConfig>, default: () => ({}) },
  gitLink: { type: String, default: '' },
  showCode: { type: Boolean, required: true },
  hideShowCodeButton: { type: Boolean, default: false },
})

const emit = defineEmits(['update:showCode'])

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

const { init } = useToast()
const shareLink = computed(() => getWindow()?.location.origin + '/play' + sandboxState.value)
const copySandboxLink = async () => {
  try {
    await getWindow()?.navigator.clipboard.writeText(window.location.origin + '/play' + sandboxState.value)
    init('Link copied to clipboard')
  } catch (e: any) {
    init('Permission failure!')
  }

  setTimeout(() => { copyButtonState.value = 'default' }, 1500)
}

const buttonStates = {
  active: { text: 'Copied', icon: 'fa4-check' },
  error: { text: 'Permission failure!', icon: 'fa4-times' },
  default: { text: 'Copy code', icon: 'fa4-files-o' },
}
const copyButton = computed(() => buttonStates[copyButtonState.value])
const query = '?query=file=/src/App.vue'
const sandboxDefineUrl = computed(() => `https://codesandbox.io/api/v1/sandboxes/define${query}`)
const sandboxParams = computed(() => createCodeSandbox(props.code, props.config))

const sandboxState = ref('')

const doShowPlaygroundButton = computed(() => {
  return !props.code.includes('<style lang="scss"') && !props.code.includes('@import')
})
</script>

<style lang="scss">
@import "vuestic-ui/src/styles/resources";
@import "@/assets";

.docs-navigation {
  background: var(--va-background-border);
  margin: -2px 0 0.2rem 0;
  border-radius: 0 0 0.25rem 0.25rem;
  padding: 0 calc(var(--va-card-padding) - var(--va-button-sm-content-px) / 2);
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &__button {
    padding: 0.5rem 0rem !important ;
    margin-right: 0.25rem;
    font-weight: bold !important;

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

      @include sm(margin-left, 0.75rem);
      @include sm(margin-right, 0.75rem);
    }
  }

  form {
    display: inline-flex;
  }

  .docs-navigation__button__text {
    @include sm(display, none);
  }
}

.playground-modal {
  --va-modal-padding: 0px;

  .va-modal__inner {
    max-width: 100%;
    height: 100vh;
  }
  .va-modal__message {
    margin-bottom: 0;
    overflow: auto;
    flex: 1;
  }
  .va-modal__footer {
    padding: 1rem;
  }
  .va-modal__close  {
    display: none;
  }
}
</style>
