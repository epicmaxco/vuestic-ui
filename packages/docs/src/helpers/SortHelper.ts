import {
  ManualPropApiOptions,
  ManualMethodApiOptions,
  ManualEventApiOptions,
  ManualSlotApiOptions,
} from '../components/DocsApi/ManualApiOptions'

type apiOptions = ManualPropApiOptions |
ManualMethodApiOptions |
ManualEventApiOptions |
ManualSlotApiOptions

export const sortObjectByPropNames = <T>(
  obj: Record<string, T>,
): T[] => {
  const arrFromObj: T[] = Object.values(obj)

  const sortedArr = arrFromObj.sort(
    (element1: apiOptions, element2: apiOptions) => {
      if (element1.name && element2.name) {
        return element1.name.localeCompare(element2.name)
      }
      // Options with name == undefined must bubble in sort
      return -1
    },
  )

  return sortedArr
}
