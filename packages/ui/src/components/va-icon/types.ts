import type { VuesticIconAliases } from './../../services/icon/presets/vuestic-aliases'
import type { ExtractIconAliasesName } from '../../services/icon/types/define-aliases'

type DefaultIconAliases = ExtractIconAliasesName<typeof VuesticIconAliases>

/**
 * This is a placeholder meant to be implemented via TypeScript's Module
 * Augmentation feature to allow key type inference
 *
 * @example
 * ```ts
 * declare module 'vuestic-ui' {
 *   interface CustomIconAliasesNKeys {
 *     from: string
 *   }
 * }
 * ```
 *
 * @see https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
 */
export interface CustomIconAliasesNKeys {}

export type VaIconName = DefaultIconAliases | keyof CustomIconAliasesNKeys
