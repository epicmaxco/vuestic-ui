export const fa4FontCodeExample = `
const fonts = [
  {
    name: 'fa4-{code}',
    iconClass: ({code}) => \`fa4 fa fa-\${code}\`,   
    color: '#e0e0e0'
  },
  {
    name: 'flag-icon-{code} {size}',
    iconClass: ({code, size}) => \`flag-icon flag-icon-\${code} flag-icon-\${size}\`
  }
]
`
