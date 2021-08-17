import { normalizeEventNames } from '../api-docs-helpers'

describe('normalizeEventNames', () => {
  it('Sync events', () => {
    const manualEvents = {
      'update:view': {},
      'hover:year': {},
    }
    const expectedResult = {
      'update-view': {
        name: 'update:view',
      },
      'hover-year': {
        name: 'hover:year',
      },
    }

    const result = normalizeEventNames(manualEvents)

    expect(expectedResult).toStrictEqual(result)
  })

  it('Sync events with kebab case events', () => {
    const manualEvents = {
      updateView: {},
      'update:viewModel': {},
      'updateModel:viewModel': {},
      'update:view': {},
      'hover:year': {},
    }
    const expectedResult = {
      'hover-year': {
        name: 'hover:year',
      },
      'update-model-view-model': {
        name: 'update-model:view-model',
      },
      'update-view': {
        name: 'update:view',
      },
      'update-view-model': {
        name: 'update:view-model',
      },
    }

    const result = normalizeEventNames(manualEvents)

    expect(expectedResult).toStrictEqual(result)
  })

  it('Kebab case events', () => {
    const manualEvents = {
      updateView: {},
      hoverMonth: {},
    }
    const expectedResult = {
      'hover-month': {
        name: 'hover-month',
      },
      'update-view': {
        name: 'update-view',
      },
    }

    const result = normalizeEventNames(manualEvents)

    expect(expectedResult).toStrictEqual(result)
  })

  it('Different cases', () => {
    const manualEvents = {
      updateView: {},
      'hover-month': {},
      'hover:month': {},
      'hover.year': {},
      hover_day: {},
    }
    const expectedResult = {
      'hover-day': {
        name: 'hover-day',
      },
      'hover-month': {
        name: 'hover:month',
      },
      'hover-year': {
        name: 'hover-year',
      },
      'update-view': {
        name: 'update-view',
      },
    }

    const result = normalizeEventNames(manualEvents)

    expect(expectedResult).toStrictEqual(result)
  })

  it('Mix cases, events override', () => {
    // should not appear in project
    const manualEvents = {
      updateView: {},
      'update:view': {},
    }
    const expectedResult = {
      'update-view': {
        name: 'update:view',
      },
    }

    const result = normalizeEventNames(manualEvents)

    expect(expectedResult).toStrictEqual(result)
  })
})
