import { describe, it, expect } from 'vitest'

import { getValueByKey } from '../value-by-key'

describe('value by key', () => {
  const entries = [
    {
      props: {
        option: 'string',
        prop: 'prop',
      },
      expected: undefined,
    },
    {
      props: {
        option: { prop: 'string' },
        prop: 'prop',
      },
      expected: 'string',
    },
    {
      props: {
        option: { prop: false },
        prop: 'prop',
      },
      expected: false,
    },
    {
      props: {
        option: { prop: null },
        prop: 'prop',
      },
      expected: null,
    },
    {
      props: {
        option: { prop: 0 },
        prop: 'prop',
      },
      expected: 0,
    },
    {
      props: {
        option: { prop: undefined },
        prop: 'prop',
      },
      expected: undefined,
    },
    {
      props: {
        option: { prop: 'string' },
        prop: undefined,
      },
      expected: { prop: 'string' },
    },
    {
      props: {
        option: { prop: 'string' },
        prop: 1,
      },
      expected: { prop: 'string' },
    },
    {
      props: {
        option: { prop: 'string' },
        prop: 'does not exist',
      },
      expected: undefined,
    },
    {
      props: {
        option: { prop: 0 },
        prop: (v: Record<string, any>) => v.prop,
      },
      expected: 0,
    },
  ]

  entries.forEach(({ props, expected }) => {
    it(`for ${JSON.stringify(props)} expected ${JSON.stringify(expected)}`, () => {
      expect(getValueByKey(props.option, props.prop as any)).toEqual(expected)
    })
  })
})
