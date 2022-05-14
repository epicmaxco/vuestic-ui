import { defineComposable } from './defineComposable'

const props = {
  color: String,
}

const emits = ['click']

// TODO: Improve tests with component wrapper.
describe('defineComposable', () => {
  it('propss',
    () => {
      const props = {
        color: String,
      }

      const useColor = defineComposable(
        ({ props }) => props.color, { props },
      )

      // Emits shoudn't exist in useColor
      expect(useColor.$props).toEqual(props)
      expect(useColor.$emits).toEqual(undefined)
    },
  )
  it('emits',
    () => {
      const useColor = defineComposable(({ emit }) => {
        emit('click')
      }, { emits })

      // $props shoudn't exist in useColor
      expect(useColor.$props).toEqual(undefined)
      expect(useColor.$emits).toEqual(emits)
    },
  )
})
