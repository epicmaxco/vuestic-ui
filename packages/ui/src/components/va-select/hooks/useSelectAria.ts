import { useComponentUuid } from '../../../composables/useComponentUuid'

export const useSelectAria = () => {
  const id = useComponentUuid()

  const popupId = `combobox-controls-${id}`

  return {
    popupId,
  }
}
