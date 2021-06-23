export const filterPropValues = (propsValues: Record<string, any>, propTypes: Record<string, any>) => {
  const VaInputPropsNames = Object.keys(propTypes)

  return VaInputPropsNames.reduce((acc, propName) => ({ ...acc, [propName]: propsValues[propName] }), {}) as Record<keyof typeof propTypes, any>
}
