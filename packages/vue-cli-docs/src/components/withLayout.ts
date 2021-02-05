export default function (classComponent: any, layout = 'default') {
  const options = classComponent.options
  if (options?.layout) { return classComponent }

  classComponent.options = classComponent.options || {}
  classComponent.options.layout = layout
  return classComponent
}
