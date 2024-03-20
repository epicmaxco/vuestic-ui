import type { VuesticIconAliases } from './../../services/icon/presets/vuestic-aliases'
import type { ExtractIconAliasesName } from '../../services/icon/types/define-aliases'

type DefaultIconAliases = ExtractIconAliasesName<typeof VuesticIconAliases>

export type VaIconName = DefaultIconAliases
