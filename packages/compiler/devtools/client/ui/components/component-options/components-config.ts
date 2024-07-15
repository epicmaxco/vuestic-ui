type PropConfigSelect = {
  type: 'select',
  options: string[]
}

type PropConfigText = {
  type: 'text'
}

type PropConfigMultiText = {
  type: 'multi-text'
}

type PropConfigNumber = {
  type: 'number'
}

type PropConfigColor = {
  type: 'color'
}

type PropConfigCheckbox = {
  type: 'checkbox'
}

type PropConfigDisabled = {
  type: 'disabled'
}

type PropConfig = PropConfigSelect | PropConfigText | PropConfigNumber | PropConfigColor | PropConfigMultiText | PropConfigCheckbox | PropConfigDisabled
type PropsConfig = Record<string, PropConfig>

const globalConfig: PropsConfig = {
  color: { type: 'color' },
  textColor: { type: 'color' },
  background: { type: 'color' },
  backgroundColor: { type: 'color' },
  stripeColor: { type: 'color' },
  to: { type: 'text' },
  preset: { type: 'multi-text' },
  sizesConfig: { type: 'disabled' },
  fontSizesConfig: { type: 'disabled'}
}

const componentsConfig: Record<string, PropsConfig> = {
  
}

export const getPropConfig = (component: string, prop: string): PropConfig | undefined => {
  if (componentsConfig[component] && componentsConfig[component][prop]) {
    return componentsConfig[component][prop]
  }

  return globalConfig[prop]
}
