import { PageGenerationHelper } from '../../../helpers/DocsHelper'
import { ModalOptions } from '../../../../../ui/src/components/va-modal/types'

export const methodsApi = (block: PageGenerationHelper) => block.table(
  [
    { title: 'Method name', type: 'markdown' },
    { title: 'Api Type', type: 'markdown' },
    { title: 'Description', type: 'markdown' },
  ],
  [
    ['init(options: string | ModalOptions)', 'Options | Composition', 'Creates new modal instance. Returns modal instance VNode'],
  ],
)

const modalOptions: Record<keyof ModalOptions, string> = {
  title: 'string',
  message: 'string',
  attachElement: 'string',
  disableAttachElement: 'boolean',
  okText: 'string',
  cancelText: 'string',
  hideDefaultActions: 'boolean',
  fullscreen: 'boolean',
  mobileFullscreen: 'boolean',
  noDismiss: 'boolean',
  noOutsideDismiss: 'boolean',
  noEscDismiss: 'boolean',
  maxWidth: 'string',
  maxHeight: 'string',
  size: 'small | medium | large',
  fixedLayout: 'boolean',
  withoutTransitions: 'boolean',
  overlay: 'boolean',
  overlayOpacity: 'number | string',
  zIndex: 'number | string',
  onOk: '() => void',
  onCancel: '() => void',
  onClickOutside: '() => void',
  'onUpdate:modelValue': '(value: boolean) => void',
  onOpen: '(el: HTMLElement) => void',
  onClose: '(el: HTMLElement) => void',
}

export const optionsApi = (block: PageGenerationHelper) => block.table(
  [{ title: 'type', type: 'markdown' }, { title: 'type', type: 'code' }],
  Object.entries(modalOptions),
)

const optionsApiExample = `
export default {
  methods: {
    onOkCallback() { ... },
    onCancelCallback() { ... },
    onButtonClick() {
      this.$vaModal.init({
        message: 'Modal example!',
        onOk: this.onOkCallback,
        onCancel: this.onCancelCallback,
      })
    },
  },
}
`

const compositionApiExample = `
import { useModal } from 'vuestic-ui'
export default defineComponent({
  setup() {
    const { init } = useModal()
    const onOkCallback = () => { ... }
    const onCancelCallback = () => { ... }

    return {
      onButtonClick: () => init({
        message: 'Modal example!',
        onOk: onOkCallback,
        onCancel: onCancelCallback,
      }),
    }
  }
})
`

export const apiExamplesObject = {
  'options Api': optionsApiExample,
  'composition Api': compositionApiExample,
}
