export const insertVuesticPlugin = (source: string, pluginCode: string) => {
  const alreadyExists = source.indexOf(`.use(${pluginCode})`)

  if (alreadyExists !== -1) { return source; }

  const lines = source.split('\n')

  /* Vue app stored in variable
  const app = createApp(App)
  ...
  app.mount('#app')
  */
  const renderIndex = lines.findIndex(line => line.match(/app\.mount/))

  if (renderIndex !== -1) {
    lines[renderIndex - 1] += `\n\napp.use(${pluginCode});`

    return lines.join('\n')
  } else {
    /* Vue app chained
    createApp(App).mount('#app')
    */
    return lines
      .map((line) => {
        if (line.match(/\.mount/) != null) {
          return line.replace('.mount', `.use(${pluginCode}).mount`)
        }

        return line
      })
      .join('\n')
  }
}
