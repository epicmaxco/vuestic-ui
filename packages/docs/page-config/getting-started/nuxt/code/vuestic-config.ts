import { defineVuesticConfig, createIconsConfig } from 'vuestic-ui'

export default defineVuesticConfig({
  icons: createIconsConfig({
    fonts: [
      {
        name: 'fa-{name}',
        resolve: ({ name }) => ({
          class: `fas fa-${name}`,
        })
      }
    ]
  })
})