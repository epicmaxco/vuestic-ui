import { useComponentUuid } from '../../../composables'

export const useSelectAria = () => {
  const id = useComponentUuid()

  const popupId = `combobox-controls-${id}`

  return {
    popupId,
  }
}
