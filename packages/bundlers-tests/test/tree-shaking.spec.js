const { readFileSync } = require('fs')

const tests = {
  components: (output) => {
    expect(output.includes('VaInput')).toBe(true)
    // Should not be any mention about VaSelect
    expect(output.includes('VaSelect')).toBe(false)
  },
  css: (output) => {
    // Use regex here, because bundlers can transform css. Webpack adds comments while Vite removes spaces.
    // So we need to insert .* 
    expect(/\:root\s?\{(.*)--va-primary\:(.*)\}/.test(output)).toBe(true)

    expect(/.ml-0\s?{.*margin-left:\s?0\s?!important;.*}/.test(output)).toBe(false)
    expect(/.text--capitalize\s?{/.test(output)).toBe(true)
  }
}

describe('Testing vuestic-ui build', () => {
  describe('Vue CLI (Webpack)', () => {
    const indexJs = readFileSync('./dist/vue-cli/js/index.js').toString('utf8')
    const indexCss = readFileSync('./dist/vue-cli/css/index.css').toString('utf8')

    it('Should include VaInput and do not include VaSelect', () => {
      tests.components(indexJs)
    })

    it('Should include essential css and typography, but do not include grid styles', () => {
      tests.css(indexCss)
    })
  })

  describe('Vite (Rollup & esbuild)', () => {
    const indexJs = readFileSync('./dist/vite/assets/index.js').toString('utf8')
    const indexCss = readFileSync('./dist/vite/assets/index.css').toString('utf8')

    it('Should include VaInput and do not include VaSelect', () => {
      tests.components(indexJs)
    })

    it('Should include essential css and typography, but do not include grid styles', () => {
      tests.css(indexCss)
    })
  })
})