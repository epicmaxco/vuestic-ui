export type PlaygroundOption = {
  key: string,
  type: 'select' | 'input' | 'color' | 'checkbox' | 'multiselect' | 'none',
  options?: string[],
  defaultValue?: any,
  value?: string | boolean | string[]
}

export const useComponentPlayground = (options: Record<string, Omit<PlaygroundOption, 'key'>>) => {
  const optionsRef = reactive(Object.keys(options).map((key) => reactive({ ...options[key], key })))

  const slots = computed(() => {
    return optionsRef
      .filter(({ key, value }) => {
        return key.startsWith('slot:') && value
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
      .filter(({ key, defaultValue, value }) => {
        const isDefault = defaultValue ? defaultValue === value : !value
        if (isDefault) { return null }
        return !key.startsWith('slot:')
      })
      .map(({ key, value, defaultValue }) => {
        return {
          name: key,
          value: value,
          defaultValue
        }
      })
  })

  const renderAttrs = () => {
    return '\n    ' + attrs.value
      .map(({ name, value, defaultValue }) => {
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
      filter(({ value }) => Boolean(value)).
      map(({ name, value }) => {
        if (name === 'default') { return `  ${value}` }

        return `<template #${name}>
  ${JSON.stringify(value).slice(1, -1)}
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
