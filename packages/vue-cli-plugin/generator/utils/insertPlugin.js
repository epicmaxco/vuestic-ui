const insertVuesticPlugin = (lines, pluginName = 'createVuestic()') => {
  const alreadyExists = lines.findIndex(line => line.includes(`.use(${pluginName})`))

  if (alreadyExists !== -1) { return lines; }

  /* Vue app stored in variable
  const app = createApp(App)
  ...
  app.mount('#app')
  */
  const renderIndex = lines.findIndex(line => line.match(/app\.mount/))

  if (renderIndex !== -1) {
    lines[renderIndex - 1] += `\n\napp.use(${pluginName});`

    return lines
  } else {
    /* Vue app chained
    createApp(App).mount('#app')
    */
    return lines.map((line) => {
      if (line.match(/\.mount/) != null) {
        return line.replace('.mount', `.use(${pluginName}).mount`)
      }
      
      return line
    })
  }
}

module.exports = insertVuesticPlugin