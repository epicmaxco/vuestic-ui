export type PlaygroundOption = {
  key: string,
  type: 'select' | 'input' | 'color' | 'checkbox',
  options?: string[],
  value?: string | boolean
}

export const useComponentPlayground = (options: Record<string, Omit<PlaygroundOption, 'key'>>) => {
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
    return '\n    ' + attrs.value
      .map(({ name, value }) => {
        if (!value) { return null }

        if (typeof value === 'object') {
          value = JSON.stringify(value)
        }

        if (typeof value !== 'string') {
          return `:${name}="${value}"`
        }

        return `${name}="${value}"`
      })
      .filter(Boolean)
      .join('\n    ')
  }

  const renderSlots = () => {
    return slots.value.
      map(({ name, value }) => {
        if (name === 'default') { return `  ${value}` }

        return `<template #${name}>
  ${JSON.stringify(value)}
<template />`
      })
    .join('\n')
  }

  const renderComponent = (componentName: string, attrs: string = renderAttrs(), slots: string = renderSlots()) => {
    if (!slots) {
      return `<${componentName} ${attrs}
/>`
    }

    return `<${componentName} ${attrs}
  >
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
