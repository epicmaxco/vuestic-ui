export const scheme = `
--va-[name]
`

export const example = `
const app = createApp(App)
app.use(VuesticPlugin, {
  colors: {
    primary: '#23e066',
    custom: '#d0f55d',
  },
})

// $t('colors.syntax.availableCss')
  --va-primary: #23e066
  --va-custom: #d0f55d
`
