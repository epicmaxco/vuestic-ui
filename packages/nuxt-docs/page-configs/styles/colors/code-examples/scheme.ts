export const scheme = `
{{ $t('colors.syntax.scheme') }}: \`--va-[name]\`

[name] - {{ $t('colors.syntax.name') }}

{{ $t('colors.syntax.example') }}:
  const app = createApp(App)
  app.use(VuesticPlugin, {
    colors: {
      primary: '#B456C0',
      custom: '#A35600',
    },
  })

{{ $t('colors.syntax.availableCss') }}:
  --va-primary: #B456C0
  --va-custom: #A35600
`;
