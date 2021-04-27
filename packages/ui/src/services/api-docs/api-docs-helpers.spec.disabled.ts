import { getTypes, getApiTableData } from './api-docs-helpers'

describe('api-docs-helpers', () => {
  it('getTypes', () => {
    expect(getTypes({ type: String })).toEqual(['String'])
    expect(getTypes({ type: [String, Array] })).toEqual(['String', 'Array'])
  })
  describe('getApiTableData', () => {
    it('works with props, events, methods, slots', () => {
      const componentOptions = {
        name: 'ComponentName',
        props: {
          value: {
            type: String,
            required: true,
          },
        },
      }
      const manualOptions = {
        props: {
          version: {
            local: true,
          },
        },
        events: {
          close: { types: '() => void' },
        },
        methods: {
          focus: { types: '() => Vue', local: true },
        },
        slots: {
          label: { version: '1.1.1' },
        },
      }
      expect(getApiTableData(componentOptions, manualOptions)).toEqual({
        name: 'ComponentName',
        events: {
          close: {
            name: 'close',
            description: 'api.all.events.close',
            types: '() => void',
            version: '',
          },
        },
        methods: {
          focus: {
            name: 'focus',
            description: 'api.ComponentName.methods.focus',
            types: '() => Vue',
            version: '',
          },
        },
        slots: {
          label: {
            name: 'label',
            version: '1.1.1',
            description: 'api.all.slots.label',
          },
        },
        props: {
          value: {
            version: '',
            default: '\\-',
            description: 'api.all.props.value',
            name: 'value',
            required: true,
            types: '`String`',
          },
        },
      })
    })

    it('works with local descriptions', () => {
      const componentOptions = {
        name: 'ComponentName',
        props: {
          value: {
            type: String,
            required: true,
          },
        },
      }
      const manualOptions = {
        props: {
          value: {
            local: true,
          },
        },
      }
      const result = getApiTableData(componentOptions, manualOptions)
      expect(result.props.value.description).toEqual('api.ComponentName.props.value')
    })

    it('handles versions', () => {
      const componentOptions = {
        name: 'ComponentName',
        props: {
          value: {},
        },
      }
      const manualOptions = {
        props: {
          value: { version: '1.1.1' },
        },
      }
      const result = getApiTableData(componentOptions, manualOptions)
      expect(result.props.value.version).toEqual('1.1.1')
    })
  })
})
