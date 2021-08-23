const { execSync } = require('child_process');
const { readFileSync } = require('fs')

const shouldBeInOutput = 'VaInput'
const shouldNotBeInOutput = 'VaSelect'

describe('', () => {
  test('Build', () => {
    expect(execSync('yarn build').toString()).toBeTruthy()
  }) 

  it('Vue cli (webpack)', () => {
    const vendor = readFileSync('./dist/vue-cli/js/index.js').toString('utf8')

    expect(vendor.includes(shouldBeInOutput)).toBe(true)
    expect(vendor.includes(shouldNotBeInOutput)).toBe(false)
  })

  it('Vite', () => {
    const vendor = readFileSync('./dist/vite/assets/index.js').toString('utf8')

    expect(vendor.includes(shouldBeInOutput)).toBe(true)
    expect(vendor.includes(shouldNotBeInOutput)).toBe(false)
  })
})