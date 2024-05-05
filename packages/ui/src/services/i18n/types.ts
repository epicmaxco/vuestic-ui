import type { getI18nConfigDefaults } from './config/default'
import { StringWithAutocomplete } from '../../utils/types/prop-type'

/**
 * This is a placeholder meant to be implemented via TypeScript's Module
 * Augmentation feature to allow key type inference
 *
 * @example
 * ```ts
 * declare module 'vuestic-ui' {
 *   interface CustomI18NKeys {
 *     newKey: string
 *   }
 * }
 * ```
 *
 * @see https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
 */
export interface CustomI18NKeys {}

export type I18NDefaultKey = keyof ReturnType<typeof getI18nConfigDefaults>

export type I18nConfig = Record<I18NDefaultKey, string> & CustomI18NKeys & Record<string, string>

export type I18NKnownKey = I18NDefaultKey | keyof CustomI18NKeys;

export type I18NKey = StringWithAutocomplete<I18NKnownKey>
