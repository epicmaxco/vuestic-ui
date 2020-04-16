import { computeAffixedState } from '../VaAffix-utils'

describe('VaAffix utils', () => {
  let target: Window | HTMLElement = window

  test('computeAffixedState with the window target', () => {
    let coordinates = {
      top: 0,
      bottom: 0,
    }

    // TODO: think of a way of not to test the implementation details
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 10 })

    expect(computeAffixedState({ coordinates, target })).toStrictEqual({
      isTopAffixed: false,
      isBottomAffixed: false,
    })

    coordinates = {
      top: 0,
      bottom: 0,
    }

    expect(computeAffixedState({ coordinates, target, offsetTop: 0 })).toStrictEqual({
      isTopAffixed: true,
      isBottomAffixed: false,
    })

    coordinates = {
      top: 4,
      bottom: 8,
    }

    expect(computeAffixedState({ coordinates, target, offsetTop: 0 })).toStrictEqual({
      isTopAffixed: false,
      isBottomAffixed: false,
    })

    coordinates = {
      top: 2,
      bottom: 8,
    }

    expect(computeAffixedState({ coordinates, target, offsetTop: 4 })).toStrictEqual({
      isTopAffixed: true,
      isBottomAffixed: false,
    })

    coordinates = {
      top: 4,
      bottom: 9,
    }

    expect(computeAffixedState({ coordinates, target, offsetTop: 4, offsetBottom: 2 })).toStrictEqual({
      isTopAffixed: true,
      isBottomAffixed: true,
    })

    coordinates = {
      top: 23,
      bottom: 56,
    }

    expect(computeAffixedState({ coordinates, target, offsetTop: 4, offsetBottom: 2 })).toStrictEqual({
      isTopAffixed: false,
      isBottomAffixed: true,
    })

    coordinates = {
      top: 23,
      bottom: 56,
    }

    expect(computeAffixedState({ coordinates, target, offsetTop: 4 })).toStrictEqual({
      isTopAffixed: false,
      isBottomAffixed: false,
    })
  })

  test('computeAffixedState with the custom target', () => {
    target = document.createElement('div')

    type TargetRect = {
      top: number;
      bottom: number;
    }

    function setDimensions ({ top, bottom }: TargetRect) {
      // TODO: think of a way of not to test the implementation details
      (target as any).getBoundingClientRect = jest.fn(() => ({
        top,
        bottom,
      }))
    }

    let targetRect = {
      top: 10,
      bottom: 30,
    }

    setDimensions(targetRect)

    let coordinates = {
      top: 20,
      bottom: 25,
    }

    expect(computeAffixedState({ coordinates, target, offsetTop: 0, offsetBottom: 0 })).toStrictEqual({
      isTopAffixed: false,
      isBottomAffixed: false,
    })

    targetRect = {
      top: 10,
      bottom: 30,
    }

    setDimensions(targetRect)

    coordinates = {
      top: 4,
      bottom: 9,
    }

    expect(computeAffixedState({ coordinates, target, offsetTop: 4, offsetBottom: 2 })).toStrictEqual({
      isTopAffixed: true,
      isBottomAffixed: false,
    })

    targetRect = {
      top: 10,
      bottom: 30,
    }

    setDimensions(targetRect)

    coordinates = {
      top: 4,
      bottom: 45,
    }

    expect(computeAffixedState({ coordinates, target, offsetTop: 4, offsetBottom: 2 })).toStrictEqual({
      isTopAffixed: true,
      isBottomAffixed: true,
    })
  })
})
