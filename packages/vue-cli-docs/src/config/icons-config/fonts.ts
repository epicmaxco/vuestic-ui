import { IconsConfig } from 'vuestic-ui/src/main'

export const fonts: IconsConfig = [
  {
    name: /fa4-(.*)/,
    iconClass: (code: string) => `fa fa-${code}`,
  },
]
