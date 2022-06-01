import type { Placement } from '../../composables/usePopover'

export type { SelectableOption as VaSelectOption } from '../../composables/useSelectableList'
export type VaSelectDropdownIcon = {
  open: string,
  close: string
}

export type VaSelectPlacement = Partial<Placement>
