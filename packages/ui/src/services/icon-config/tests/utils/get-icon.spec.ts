import { getIconConfiguration } from '../../get-icon'
import { IconConfig } from '../../icon-config'

describe('IconConfig', () => {
  describe('get-icon', () => {
    it('getIconConfiguration (dynamic segment)', () => {
      const iconConfig = [
        {
          name: 'phone',
          to: 'fa4-phone',
          color: '#ff00ff', // priority 1
        },
        {
          name: 'fa4-{code}',
          resolve: ({ code }) => ({
            class: `fa fa-${code}`, // priority 3
            tag: 'tag in font resolve', // priority 3
          }),
          color: '#fff', // priority 2
          tag: 'tag in font', // priority 2
        },
      ] as IconConfig

      expect(getIconConfiguration('phone', iconConfig))
        .toEqual({
          class: 'fa fa-phone',
          color: '#ff00ff',
          tag: 'tag in font',
        })
    })

    it('getIconConfiguration (regex)', () => {
      const iconConfig: IconConfig = [
        {
          // fa4-{code}-{suffix} or fa4-{code}
          name: /^fa4-([a-zA-Z]+)-*([a-zA-Z]*)/,
          resolveFromRegex: (code: string, suffix: string | undefined) => ({
            class: suffix ? `fa fa-${code} fa-${suffix}` : `fa fa-${code}`,
          }),
          tag: 'i',
        },
      ]

      expect(getIconConfiguration('fa4-phone', iconConfig))
        .toEqual({ class: 'fa fa-phone', tag: 'i' })

      expect(getIconConfiguration('fa4-phone-outline', iconConfig))
        .toEqual({ class: 'fa fa-phone fa-outline', tag: 'i' })
    })

    it('getIconConfiguration (priority)', () => {
      const iconConfig: IconConfig = [
        {
          name: 'phone',
          attrs: {
            first: 'alias',
            // second: 'alias',
            // third: 'alias',
          },
          to: 'phone',
        },
        {
          name: /(.*)/,
          attrs: {
            first: 'global regex',
            second: 'global regex',
            // third: 'global regex',
          },
          resolveFromRegex: (code) => ({ to: `fa4-${code}` }),
        },
        {
          name: 'fa4-{code}',
          attrs: {
            first: 'font after global regex',
            second: 'font after global regex',
            third: 'font after global regex',
          },
        },
      ]

      expect(getIconConfiguration('phone', iconConfig))
        .toEqual({
          attrs: {
            first: 'alias',
            second: 'global regex',
            third: 'font after global regex',
          },
        })
    })
  })
})
