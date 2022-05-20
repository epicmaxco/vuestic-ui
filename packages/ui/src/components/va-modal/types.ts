export type ModalSize = 'small' | 'medium' | 'large'

export interface ModalOptions {
  stateful?: boolean;
  modelValue?: boolean;
  attachElement?: string;
  disableAttachElement?: boolean;
  title?: string;
  message: string;
  okText?: string;
  cancelText?: string;
  hideDefaultActions?: boolean;
  fullscreen?: boolean;
  mobileFullscreen?: boolean;
  noDismiss?: boolean;
  noOutsideDismiss?: boolean;
  noEscDismiss?: boolean;
  maxWidth?: string;
  maxHeight?: string;
  backgroundColor?: string;
  size?: ModalSize;
  fixedLayout?: boolean;
  withoutTransitions?: boolean;
  overlay?: boolean;
  overlayOpacity?: number | string;
  blur?: boolean;
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
