import { mergeApiTableEvents } from '../api-docs-helpers'
import { EventOptionsCompiled } from '../component-options-compiler'

const componentEvents: Record<string, EventOptionsCompiled> = {
  'update:view': {
    types: 'any',
  },
  'hover:year': {
    types: 'any',
  },
}

describe('mergeApiTableEvents', () => {
  it('`Component colon events` with `kebab case manualEvents`, ', () => {
    const manualEvents = {
      'update-view': {
        types: '() => any',
      },
      'hover-year': {
        types: '() => any',
      },
    }
    const expectedResult = {
      'update:view': {
        types: '() => any',
      },
      'hover:year': {
        types: '() => any',
      },
    }

    const mergeResult = mergeApiTableEvents(componentEvents, manualEvents)

    expect(expectedResult).toStrictEqual(mergeResult)
  })

  it('`Component colon events` with `kebab case manualEvents`, there is more manualEvents', () => {
    const manualEvents = {
      'update-view': {
        types: '() => any',
      },
      'hover-month': {
        types: '() => any',
      },
    }
    const expectedResult = {
      'hover-month': {
        types: '() => any',
      },
      'update:view': {
        types: '() => any',
      },
      'hover:year': {
        types: 'any',
      },
    }

    const mergeResult = mergeApiTableEvents(componentEvents, manualEvents)

    expect(expectedResult).toStrictEqual(mergeResult)
  })

  it('`Component kebab case events` with `manualEvents kebab case`', () => {
    const componentEvents: Record<string, EventOptionsCompiled> = {
      'update-view': {
        types: 'any',
      },
      'hover-month': {
        types: 'any',
      },
    }
    const manualEvents = {
      'update-view': {
        types: '() => any',
      },
      'hover-month': {
        types: '() => any',
      },
    }
    const expectedResult = {
      'hover-month': {
        types: '() => any',
      },
      'update-view': {
        types: '() => any',
      },
    }

    const mergeResult = mergeApiTableEvents(componentEvents, manualEvents)

    expect(expectedResult).toStrictEqual(mergeResult)
  })
})
