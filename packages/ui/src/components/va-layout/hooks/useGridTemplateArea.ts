import { computed } from 'vue'
import { type LayoutProps } from './useLayout'

const areaIndexes = {
  top: [0, 1, 2],
  left: [0, 3, 6],
  right: [2, 5, 8],
  bottom: [6, 7, 8],
}

export type AreaName = 'top' | 'left' | 'right' | 'bottom'
const areaElements = (['left', 'right', 'top', 'bottom'] as const)

export const useGridTemplateArea = (props: LayoutProps) => {
  const sort = () => {
    return [...areaElements].sort((a, b) => {
      return (props[a].order ?? 0) - (props[b].order ?? 0)
    })
  }

  const applyTemplate = (template: string[], areaIndexes: number[], areaName: AreaName) => {
    areaIndexes.forEach((index) => {
      template[index] = areaName
    })
  }

  return computed(() => {
    const sorted = sort()

    const template = [
      '.', '.', '.',
      '.', '.', '.',
      '.', '.', '.',
    ].map(() => 'content')

    sorted.forEach((areaName) => {
      applyTemplate(template, areaIndexes[areaName], areaName)
    })

    return [
      '"' + template.slice(0, 3).join(' ') + '"',
      '"' + template.slice(3, 6).join(' ') + '"',
      '"' + template.slice(6, 9).join(' ') + '"',
    ].join(' ')
  })
}
