import { ValidationRule } from "vuestic-ui/src/composables"

export type PlaygroundOption<T extends string = string> = {
  key: string,
  type: 'select' | 'input' | 'color' | 'checkbox' | 'multiselect' | 'none',
  options?: string[],
  /** In case you want value to be clear, but provide default value */
  defaultValue?: any,
  value?: string | boolean | string[],
  hidden?: (options: Record<T, any>) => boolean,
  rules?: ValidationRule[]
}

export const useComponentPlayground = <Options extends string>(options: Record<Options, Omit<PlaygroundOption<Options>, 'key'>>) => {
  const optionsRef = reactive(Object.keys(options).map((key) => reactive({ ...options[key as Options], key })))

  const slots = computed(() => {
    return optionsRef
      .filter(({ key, value }) => {
        return key.startsWith('slot:') && value
      })
      .map(({ key, value }) => {
        return {
          name: key.replace('slot:', ''),
          value: String(value)
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
    if (attrs.value.length == 0) { return '' }

    return '\n  ' + attrs.value
      .sort((aO, bO) => {
        const a = typeof aO.value
        const b = typeof bO.value

        if (a === b) { return 0 }

        if (a === 'object') { return -1 }
        if (b === 'object') { return 1 }

        if (a === 'boolean') { return 1 }
        if (a === 'string' && b !== 'boolean') { return 1 }
        if (a !== 'string' && b === 'boolean') { return -1 }

        return 0
      })
      .map(({ name, value, defaultValue }) => {
        if (typeof value == 'string') {
          return `${name}="${value}"`
        }

        if (typeof value === 'boolean' && value === true) {
          return name
        }

        if (typeof value === 'object') {
          value = JSON.stringify(value)
        }

        return `:${name}="${value}"`
      })
      .filter(Boolean)
      .join('\n  ')
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

    if (attrs.length > 0) {
      attrs = `${attrs}\n`
    }

    return `<${componentName}${attrs}>
${slots}
</${componentName}>`
  }

  return {
    options: optionsRef as unknown as (PlaygroundOption & { value: any })[],
    attrs,
    slots,
    renderAttrs,
    renderSlots,
    renderComponent,
  }
}
