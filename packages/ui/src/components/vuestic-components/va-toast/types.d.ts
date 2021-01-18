import { Vue } from 'vue-class-component'
import { VNode } from 'vue'

export type NotificationPosition =
  'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'

/** Notification Component Inteface */
export interface NotificationComponentInterface {
  (options: NotificationOptions): any;

  close (id: string, onCloseHandler?: Function): void;

  closeAll? (): void;
}

/** Notification Component */
export declare class NotificationComponent extends Vue {
  /** Close the Notification instance */
  close (id: string, userOnClose: () => void): void

  closeAll? (): void
}

export interface NotificationOptions {
  /** Title */
  title?: string;

  /** Description text */
  message: string | VNode;

  /** Custom icon's class. It will be overridden by type */
  iconClass?: string;

  /** Custom class name for Notification */
  customClass?: string;

  /** Duration before close. It will not automatically close if set 0 */
  duration?: number;

  /** Whether to show a close button */
  closeable?: boolean;

  /** Whether message is treated as HTML string */
  dangerouslyUseHTMLString?: boolean;

  /** Callback function when closed */
  onClose?: () => void;

  /** Callback function when notification clicked */
  onClick?: () => void;

  /** Offset from the top edge of the screen. Every Notification instance of the same moment should have the same offset */
  offsetX?: number;

  /** custom position */
  position?: NotificationPosition;

  offsetY?: number;

  visible?: boolean;

  color?: string;
}

export interface NotificationInterface {
  /** Show a notification */
  (options: NotificationOptions | string): NotificationComponent;
}
