import { VNode } from 'vue'

export type MessageBoxSize =
  'small'
  | 'medium'
  | 'large'

export interface MessageBoxOptions {
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
  size?: MessageBoxSize;
  fixedLayout?: boolean;
  withoutTransitions?: boolean;
  overlay?: boolean;
  overlayOpacity?: number | string;
  zIndex?: number | string;
  ok?: () => void;
  cancel?: () => void;
  beforeOpen?: () => void;
  open?: () => void;
  beforeClose?: () => void;
  close?: () => void;
  clickOutside?: () => void;
  updateModelValue?: () => void;
}
