import { useSizeProps } from '../../../composables'
import { Sizes, Variables } from '../const'
import { useVaRatingColorsProps } from '../hooks/useVaRatingColors'

export const useRatingItemCommonProps = {
  ...useVaRatingColorsProps,
  ...useSizeProps<Variables, Sizes>(),
}
