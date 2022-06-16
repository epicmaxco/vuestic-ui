import type { TranslationString } from './translations'
import { DocsBlock } from './docs-blocks'

// Universal options for props, events, methods, slots.
interface ManualApiOption {
  // version?: VersionString;
  name?: string;

  /**
   * Used for custom translation string.
   * @example props: { inputColor: 'api.VaInput.props.color' }
   */
  translation?: TranslationString;
}

interface ManualPropApiOption extends ManualApiOption {
  /** Won't appear in documentation. Intended for internal usage props, such as icon and color configs. */
  hidden?: boolean;
  types?: string;
}

interface ManualMethodApiOption extends ManualApiOption {
  types?: string;
}

interface ManualEventApiOption extends ManualApiOption {
  /** Won't appear in documentation. Intended for internal usage events. */
  hidden?: boolean;
  types: string;
}

interface ManualSlotApiOption extends ManualApiOption {}

export type ManualApiOptions = {
  props?: Record<string, ManualPropApiOption>;
  methods?: Record<string, ManualMethodApiOption>;
  events?: Record<string, ManualEventApiOption>;
  slots?: Record<string, ManualSlotApiOption>;
}

export interface PageConfig {
  blocks: DocsBlock[],
  meta?: {
    /** @default { `menu.${filename}` } */
    displayName?: TranslationString,
    badge?: 'wip' | 'new',
    category?: string,
  },
  manualApi?: ManualApiOptions,
  childOrder?: string[],
}

export interface PageRoute extends PageConfig {
  name: string,
  path: string,
  children?: PageRoute[],
}

export const definePageConfig = (config: PageConfig) => config
