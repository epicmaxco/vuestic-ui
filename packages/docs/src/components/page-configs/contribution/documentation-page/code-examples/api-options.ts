export const apiOptions = `{
  version: '1.1',
  props: {
    value: {
      hidden: false,
      types: 'String',
      version: '1.0',
    },
  },
  events: {
    input: {
      types: '(value: boolean) => void',
      version: '1.0',
    },
  },
  methods: {
    hide: {
      types: '() => void',
      version: '1.0',
    },
  },
  slots: {
    default: {
      version: '1.0',
    },
  },
}
`
