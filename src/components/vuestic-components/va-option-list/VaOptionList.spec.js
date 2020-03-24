import VaOptionList from './VaOptionList'
import { testIsSelectableList } from '../../vuestic-mixins/testIsSelectableList'

describe ('VaOptionList', () => {
  it('is SelectableList component', () => {
    expect(() => testIsSelectableList(VaOptionList)).not.toThrow()
  })
})