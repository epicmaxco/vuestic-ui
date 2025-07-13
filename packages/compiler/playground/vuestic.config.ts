import { defineVuesticConfig, createIconsConfig } from "vuestic-ui";

export default defineVuesticConfig({
  colors: {
    variables: {
      primary: '#ff0000',
      myCustomColor: '#ff00ff',
    }
  },
  i18n: {
    'test': 'test',
  },
  icons: createIconsConfig({
    aliases: [
      {
        name: 'custom',
        to: 'font-awesome',
      },
    ],
  })
})
