import { normalizeEvents } from '../api-docs-helpers'

describe('NormalizeEvents', () => {
  it('Sync events', () => {
    const manualEvents = {
      'update:view': {},
      'hover:year': {},
    }
    const expectedResult = {
      'update:view': {},
      'hover:year': {},
    }

    const result = normalizeEvents(manualEvents)

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
      'update-view': {},
      'update:view-model': {},
      'update-model:view-model': {},
      'update:view': {},
      'hover:year': {},
    }

    const result = normalizeEvents(manualEvents)

    expect(expectedResult).toStrictEqual(result)
  })

  it('Kebab case events', () => {
    const manualEvents = {
      updateView: {},
      hoverMonth: {},
    }
    const expectedResult = {
      'hover-month': {},
      'update-view': {},
    }

    const result = normalizeEvents(manualEvents)

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
      'hover-day': {},
      'hover-month': {},
      'hover-year': {},
      'hover:month': {},
      'update-view': {},
    }

    const result = normalizeEvents(manualEvents)

    expect(expectedResult).toStrictEqual(result)
  })
})
