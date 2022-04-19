import { PropType } from 'vue'

export type LoadingProps = {
  loading: boolean
}

/**
 * You could add these props to any component by destructuring them inside props option.
 * @example
 * props: { ...useLoadingProps, componentsOwnProp, etc. }
 * It's better to add props at the beginning, to make sure that Component own props will be used instead in case of collision
 */
export const useLoadingProps = {
  loading: { type: Boolean as PropType<boolean>, default: false },
}

export const useLoading = () => {
  const hasLoading = true

  return {
    hasLoading,
  }
}
