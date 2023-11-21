<template>
  <div class="docs-navigation">
    <va-button
      v-if="!hideShowCodeButton"
      preset="secondary"
      size="small"
      class="docs-navigation__button"
      color="secondary"
      @click="showCodeComputed = !showCodeComputed"
    >
      <va-icon
        class="docs-navigation__button__icon"
        name="fa4-code"
        size="13px"
      />
      <span class="docs-navigation__button__text"> {{ showCode ? 'Hide Code' : 'Show Code' }}</span>
    </va-button>

    <va-button
      preset="secondary"
      size="small"
      class="docs-navigation__button"
      color="secondary"
      @click="copy"
    >
      <va-icon
        class="docs-navigation__button__icon"
        :name="copyButton.icon"
        size="13px"
      />
      <span class="docs-navigation__button__text">{{ copyButton.text }}</span>
    </va-button>

    <va-button
      preset="secondary"
      size="small"
      class="docs-navigation__button"
      color="secondary"
      :href="gitLink"
      target="_blank"
    >
      <va-icon
        class="docs-navigation__button__icon fa fa-github"
        size="13px"
      />
      <span class="docs-navigation__button__text">Open in GitHub</span>
    </va-button>

    <VaModal stateful fullscreen class="playground-modal" hide-default-actions @ok="onHide">
      <template #anchor="{ show }">
        <va-button
          preset="secondary"
          size="small"
          class="docs-navigation__button"
          color="secondary"
          @click="show"
        >
          <va-icon
            class="docs-navigation__button__icon"
            name="auto_fix_high"
            size="13px"
          />
          <span class="docs-navigation__button__text">Playground</span>
        </va-button>
      </template>

      <ClientOnly>
        <Play
          class="h-full border-b-2 border-[var(--va-background-border)]"
          :code="code"
          v-model:state="sandboxState"
        />
      </ClientOnly>

      <template #footer="{ ok }">
        <div class="flex gap-2">
          <VaButton @click="copySandboxLink" icon="share" preset="secondary">
            Share
          </VaButton>
          <VaButton @click="ok">
            Hide
          </VaButton>
        </div>
      </template>
    </VaModal>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType, ref, Ref } from 'vue'
import { type CodeSandboxConfig, } from '@/composables/code-sandbox'
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
const copySandboxLink = async () => {
  try {
    await getWindow()?.navigator.clipboard.writeText(window.location.origin + '/play' + sandboxState.value)
    init('Link copied to clipboard')
  } catch (e: any) {
    if (e.message === 'NotAllowedError') {
      copyButtonState.value = 'error'
    }
  }

  setTimeout(() => { copyButtonState.value = 'default' }, 1500)
}

const buttonStates = {
  active: { text: 'Copied', icon: 'fa4-check' },
  error: { text: 'Permission failure!', icon: 'fa4-times' },
  default: { text: 'Copy code', icon: 'fa4-files-o' },
}
const copyButton = computed(() => buttonStates[copyButtonState.value])

const sandboxState = ref('')

// Change URL without reloading page and updating vue-router
watch(sandboxState, () => {
  window.history.replaceState({}, '', '/play' + sandboxState.value)
})

const route = useRoute()
const onHide = () => {
  sandboxState.value = ''
  nextTick(() => {
    window.history.replaceState({}, '', route.path)
  })
}
</script>

<style lang="scss">
@import "vuestic-ui/src/styles/resources";
@import "@/assets";

.docs-navigation {
  background: var(--va-background-element);
  margin: -2px 0 0.2rem 0;
  border-radius: 0 0 0.25rem 0.25rem;
  padding: 0 calc(var(--va-card-padding) - var(--va-button-sm-content-px) / 2);
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &__button {
    padding: 0.5rem 0rem;
    margin-right: 0.25rem;
    font-weight: bold;

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
