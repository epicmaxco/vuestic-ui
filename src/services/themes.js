export const originalTheme = Object.freeze({
  context: {
    gradient: true,
    shadow: 'lg', // 3 states: 'sm', 'lg', undefined (no shadow).
    invertedColor: false,
  },
  colors: {
    primary: '#40e583',
    secondary: '#002c85',
    success: '#40e583',
    info: '#2c82e0',
    danger: '#e34b4a',
    warning: '#ffc200',
    gray: '#babfc2',
    dark: '#34495e',
  },
})

export const corporateTheme = Object.freeze({
  context: {
    gradient: false,
    shadow: 'sm',
    invertedColor: true,
  },
  colors: {
    primary: '#6c7fee',
    secondary: '#6e7ff1',
    success: '#8ddc88',
    info: '#71baff',
    danger: '#f8706d',
    warning: '#ffd652',
    gray: '#8396a5',
    dark: '#34495e',
  },
})
