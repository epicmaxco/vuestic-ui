import { ExtractPropTypes } from 'vue'
import VaModal from './VaModal.vue'

export type ModalSize = 'small' | 'medium' | 'large'

export type ModalEmits = {
  onOk?: () => void;
  onCancel?: () => void;
  onClickOutside?: () => void;
  onBeforeOpen?: (el: HTMLElement) => void;
  onOpen?: (el: HTMLElement) => void;
  onBeforeClose?: (el: HTMLElement) => void;
  onClose?: (el: HTMLElement) => void;
  'onUpdate:modelValue'?: (value: boolean) => void;
}

export type ModalOptions = Omit<ExtractPropTypes<typeof VaModal> & ModalEmits, 'anchorClass'>
