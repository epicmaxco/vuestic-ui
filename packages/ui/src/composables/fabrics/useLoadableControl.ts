/**
 * You could add these props to any component by destructuring them inside props option.
 * @example
 * props: { ...useLoadingProps, componentsOwnProp, etc. }
 * It's better to add props at the beginning, to make sure that Component own props will be used instead in case of collision
 */
export const useLoadableControlProps = {
  loading: { type: Boolean, default: false },
}
