// eslint-disable-next-line @typescript-eslint/no-var-requires
const smartgrid = require('smart-grid')

/* It's principal settings in smart grid project */
const settings = {
  outputStyle: 'scss',
  columns: 12,
  offset: '30px',
  mobileFirst: false,
  container: {
    maxWidth: '1280px',
    fields: '15px',
  },
  breakPoints: {
    lg: {
      width: '1100px',
    },
    md: {
      width: '960px',
    },
    sm: {
      width: '780px',
    },
    xs: {
      width: '560px',
    },
  },
}

smartgrid('../assets/', settings)
