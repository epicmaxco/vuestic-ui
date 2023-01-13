import { useFallbackProps } from '../../../composables'

export const useAvatarProps = {
  ...useFallbackProps,

  color: { type: String, default: 'info' },
  textColor: { type: String },
  square: { type: Boolean, default: false },
  fontSize: { type: String, default: '' },
}
