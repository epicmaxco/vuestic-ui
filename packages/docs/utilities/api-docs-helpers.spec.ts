import {
  getTypes,
  convertComponentToApiDocs,
} from './api-docs-helpers'

describe('api-docs-helpers', () => {
  it('getTypes', () => {
    expect(getTypes({ type: String })).toEqual(['String'])
    expect(getTypes({ type: [String, Array] })).toEqual(['String', 'Array'])
  })
  it('convertComponentToApiDocs', () => {
    const componentApiDocs = convertComponentToApiDocs({
      props: {
        value: {
          type: String,
          required: true,
        },
      },
    })
    expect(componentApiDocs).toEqual({
      props: {
        value: {
          types: ['String'],
          required: true,
        },
      },
    })
  })
})
