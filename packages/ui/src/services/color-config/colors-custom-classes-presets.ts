import { ColorsCustomClassesConfig } from './types'

export const ColorsCustomClassesPresets: Record<string, ColorsCustomClassesConfig[]> = {
  default: [
    {
      prefix: 'bg',
      property: 'background-color',
    },
    {
      prefix: 'text',
      property: ['color', 'fill'],
    },
  ],
}
