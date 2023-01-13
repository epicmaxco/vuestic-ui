import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'fs'

const tests = {
  components: (output: any) => {
    expect(output.includes('VaInput')).toBe(true)
    // Should not be any mention about VaSelect
    expect(output.includes('VaSelect')).toBe(false)
  },
  css: (output: any) => {
    // Use regex here, because bundlers can transform css. Webpack adds comments while Vite removes spaces.
    // So we need to insert .*
    expect(/\:root\s?\{(.*)--va-primary\:(.*)\}/.test(output)).toBe(true)

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

  describe('Nuxt', () => {
    const _nuxtDir = readdirSync('./dist/nuxt/public/_nuxt/')
    const indexJs = readFileSync('./dist/nuxt/public/_nuxt/' + _nuxtDir.find((n) => /entry\..*\.js/.test(n))).toString('utf8')
    const indexCss = readFileSync('./dist/nuxt/public/_nuxt/' + _nuxtDir.find((n) => /entry\..*\.css/.test(n))).toString('utf8')

    it('Should include VaInput and do not include VaSelect', () => {
      tests.components(indexJs)
    })

    it('Should include essential css and typography, but do not include grid styles', () => {
      tests.css(indexCss)
    })
  })
})
