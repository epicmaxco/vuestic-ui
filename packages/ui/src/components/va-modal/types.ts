import { VNode } from 'vue'

export type ModalSize =
  'small'
  | 'medium'
  | 'large'

export interface ModalOptions {
  stateful?: boolean;
  modelValue?: boolean;
  attachElement?: string;
  disableAttachElement?: boolean;
  title?: string;
  message: string | VNode;
  okText?: string;
  cancelText?: string;
  hideDefaultActions?: boolean;
  fullscreen?: boolean;
  mobileFullscreen?: boolean;
  noDismiss?: boolean;
  noEscDismiss?: boolean;
  maxWidth?: string;
  maxHeight?: string;
  anchorClass?: string;
  size?: ModalSize;
  fixedLayout?: boolean;
  withoutTransitions?: boolean;
  overlay?: boolean;
  overlayOpacity?: number | string;
  zIndex?: number | string;
  onOk?: () => void;
  onCancel?: () => void;
  onClickOutside?: () => void;
  onBeforeOpen?: (el: HTMLElement) => void;
  onOpen?: (el: HTMLElement) => void;
  onBeforeClose?: (el: HTMLElement) => void;
  onClose?: (el: HTMLElement) => void;
  'onUpdate:modelValue'?: (value: boolean) => void;
}
