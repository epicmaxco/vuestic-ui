import { getIconConfiguration } from './icon-helpers'

export const useIcons = (props: any) => {
  return {
    // TODO: export here function that can dynamically change icons config
    getIcon: (name: string) => getIconConfiguration(name),
  }
}
