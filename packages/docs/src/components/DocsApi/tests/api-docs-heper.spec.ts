import { isSyncEvent, normalizeEvents } from '../api-docs-helpers'

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
      'update:view': {},
      'hover:year': {},
    }
    const expectedResult = {
      'update-view': {},
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

describe('isSyncEvent', () => {
  it('Lower case', () => {
    expect(isSyncEvent('update:view')).toBe(true)
  })

  it('Upper case', () => {
    expect(isSyncEvent('UPDATE:VIEW')).toBe(true)
  })

  it('Combine cases', () => {
    expect(isSyncEvent('UpdatE:View')).toBe(true)
  })

  it('Letters with digits', () => {
    expect(isSyncEvent('update4:view')).toBe(true)
  })

  it('Only digits', () => {
    expect(isSyncEvent('333:33')).toBe(true)
  })

  it('Column at the end, failure', () => {
    expect(isSyncEvent('update:')).toBe(false)
  })

  it('Column at the start, failure', () => {
    expect(isSyncEvent(':update')).toBe(false)
  })

  it('There is no column, failure', () => {
    expect(isSyncEvent('update')).toBe(false)
  })

  it('There is dot instead of column, failure', () => {
    expect(isSyncEvent('update.view')).toBe(false)
  })
})
