export type PlaygroundOption = {
  type: 'select' | 'input' | 'color' | 'checkbox',
  options?: string[],
  value?: string | boolean
}

export const useComponentPlayground = (options: Record<string, PlaygroundOption>) => {
  const optionsRef = reactive(Object.keys(options).map((key) => reactive({ ...options[key], key })))

  const slots = computed(() => {
    return optionsRef
      .filter(({ key }) => {
        return key.startsWith('slot:')
      })
      .map(({ key, value }) => {
        return {
          name: key.replace('slot:', ''),
          value: value
        }
      })
  })

  const attrs = computed(() => {
    return optionsRef
      .filter(({ key }) => {
        return !key.startsWith('slot:')
      })
      .map(({ key, value }) => {
        return {
          name: key,
          value: value
        }
      })
  })

  const renderAttrs = () => {
    return attrs.value
      .map(({ name, value }) => {
        if (!value) { return null }

        if (typeof value !== 'string') {
          return `:${name}="${value}"`
        }

        return `${name}="${value}"`
      })
      .filter(Boolean)
      .join(' ')
  }

  const renderSlots = () => {
    return slots.value.
      map(({ name, value }) => {
        if (name === 'default') { return `  ${value}` }

        return `<template #${name}>
  ${value}
<template />`
      })
    .join('\n')
  }

  const renderComponent = (componentName: string, attrs: string = renderAttrs(), slots: string = renderSlots()) => {
    return `<${componentName} ${attrs}>
${slots}
</${componentName}>`
  }

  return {
    options: optionsRef,
    attrs,
    slots,
    renderAttrs,
    renderSlots,
    renderComponent,
  }
}
