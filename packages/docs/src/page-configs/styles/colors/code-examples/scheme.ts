export const scheme = `
const app = createApp(App)
app.use(createVuestic({
  config: {
    colors: {
      variables: {
        primary: '#B456C0',
        custom: '#A35600',
      }
    },
  },
}))
`
