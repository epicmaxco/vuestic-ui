import { mergeConfigs } from './ContextPlugin'

describe('ContextPlugin', function () {
  it('mergeConfigs', () => {
    const configA = {
      A: { A: 'A' },
      AB: {
        A: 'A',
        AB: 'A',
      },
    }
    const configB = {
      AB: {
        AB: 'B',
        B: 'B',
      },
      B: { B: 'B' },
    }

    expect(mergeConfigs(configA, configB)).toEqual({
      A: { A: 'A' },
      AB: {
        A: 'A',
        AB: 'B',
        B: 'B',
      },
      B: { B: 'B' },
    })
  })
})
