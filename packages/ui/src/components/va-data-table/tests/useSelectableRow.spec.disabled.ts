import { Ref, ref, nextTick } from 'vue'
import { TableRow, ITableItem, TSelectMode } from '../types'
import useSelectableRow, { TSelectionChange } from '../hooks/useSelectableRow'

const selectableCases: boolean[] = [true, false]
const selectModes: TSelectMode[] = ['single', 'multiple']
const events = ['update:modelValue', 'selectionChange']
const rowsIndexes: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const rawRows: TableRow[] = rowsIndexes.map(item => ({
  source: { id: item, title: String(item) },
  initialIndex: item,
  cells: [],
}))

// base case arguments
const paginatedRows = ref(rawRows.slice(0, 6))
const props = {
  modelValue: [] as ITableItem[],
  selectable: selectableCases[0],
  selectMode: selectModes[1],
}
let emit = jest.fn()

// helpers
type TSources = number[] | 'all'
const sources = (rowIndexes: TSources): ITableItem[] => {
  if (rowIndexes === 'all') {
    return paginatedRows.value.map(row => row.source)
  }
  return rowIndexes.map(i => paginatedRows.value[i].source)
}
const selections = (current: TSources, previous: TSources): TSelectionChange => {
  return {
    currentSelectedItems: sources(current),
    previousSelectedItems: sources(previous),
  }
}
const doneAfterCheckCallTimes = async (done: jest.DoneCallback, times: number) => {
  await nextTick()
  expect(emit).toHaveBeenCalledTimes(times)
  done()
}
const expectSelectionChange = async (times: number, current: TSources, previous: TSources) => {
  await nextTick()
  expect(emit).toHaveBeenCalledTimes(times)
  expect(emit).toHaveBeenLastCalledWith(events[1], selections(current, previous))
}
const expectUpdateModelValue = (times: number, result: TSources) => {
  expect(emit).toHaveBeenCalledTimes(times)
  expect(emit).toHaveBeenLastCalledWith(events[0], sources(result))
}

describe('useSelectableRow (vaDataTable hook)', () => {
  afterEach(() => {
    props.modelValue = []
    props.selectable = selectableCases[0]
    props.selectMode = selectModes[1]
    emit = jest.fn()
    jest.clearAllMocks()
  })

  it('noRowsSelected', async (done) => {
    const { noRowsSelected } = useSelectableRow(paginatedRows, props, emit)

    expect(noRowsSelected.value).toBe(true)

    props.modelValue = sources([0])
    await expectSelectionChange(1, [0], [])
    expect(noRowsSelected.value).toBe(false)

    await doneAfterCheckCallTimes(done, 1)
  })

  it('severalRowsSelected', async (done) => {
    const { severalRowsSelected } = useSelectableRow(paginatedRows, props, emit)

    expect(severalRowsSelected.value).toBe(false)

    props.modelValue = sources([0])
    await expectSelectionChange(1, [0], [])
    expect(severalRowsSelected.value).toBe(true)

    props.modelValue = sources('all')
    await expectSelectionChange(2, 'all', [0])
    expect(severalRowsSelected.value).toBe(false)

    await doneAfterCheckCallTimes(done, 2)
  })

  it('allRowsSelected', async (done) => {
    const paginatedRows = ref(rawRows.slice(0, 6))
    const { allRowsSelected } = useSelectableRow(paginatedRows, props, emit)

    expect(allRowsSelected.value).toBe(false)

    props.modelValue = sources([0])
    await expectSelectionChange(1, [0], [])
    expect(allRowsSelected.value).toBe(false)

    props.modelValue = sources('all')
    await expectSelectionChange(2, 'all', [0])
    expect(allRowsSelected.value).toBe(true)

    paginatedRows.value = []
    await nextTick()
    expectUpdateModelValue(3, [])
    expect(allRowsSelected.value).toBe(false)

    await doneAfterCheckCallTimes(done, 3)
  })

  it('isRowSelected', async (done) => {
    const { isRowSelected } = useSelectableRow(paginatedRows, props, emit)
    const targetRow = paginatedRows.value[0]

    expect(isRowSelected(targetRow)).toBe(false)

    props.modelValue = sources([0])
    await expectSelectionChange(1, [0], [])
    expect(isRowSelected(targetRow)).toBe(true)

    props.modelValue = sources('all')
    await expectSelectionChange(2, 'all', [0])
    expect(isRowSelected(targetRow)).toBe(true)

    props.modelValue = []
    await expectSelectionChange(3, [], 'all')
    expect(isRowSelected(targetRow)).toBe(false)

    await doneAfterCheckCallTimes(done, 3)
  })

  it('toggleBulkSelection', async (done) => {
    const { toggleBulkSelection } = useSelectableRow(paginatedRows, props, emit)

    toggleBulkSelection()
    expectUpdateModelValue(1, 'all')

    props.modelValue = sources('all')
    await expectSelectionChange(2, 'all', [])

    toggleBulkSelection()
    expectUpdateModelValue(3, [])

    props.modelValue = sources([0])
    await expectSelectionChange(4, [0], 'all')

    toggleBulkSelection()
    expectUpdateModelValue(5, 'all')

    await doneAfterCheckCallTimes(done, 5)
  })

  describe('toggleRowSelection"', () => {
    it('selectable = false', async (done) => {
      props.selectable = selectableCases[1]
      const { toggleRowSelection } = useSelectableRow(paginatedRows, props, emit)

      toggleRowSelection(paginatedRows.value[0])
      expect(emit).toHaveBeenCalledTimes(0)

      await doneAfterCheckCallTimes(done, 0)
    })

    it('selectable = true', async (done) => {
      const { toggleRowSelection } = useSelectableRow(paginatedRows, props, emit)
      const targetRow = paginatedRows.value[0]

      toggleRowSelection(targetRow)
      expectUpdateModelValue(1, [0])

      props.modelValue = sources([0, 1])
      await expectSelectionChange(2, [0, 1], [])

      toggleRowSelection(targetRow)
      expectUpdateModelValue(3, [1])

      props.modelValue = sources([0])
      await expectSelectionChange(4, [0], [0, 1])

      toggleRowSelection(targetRow)
      expectUpdateModelValue(5, [])

      await doneAfterCheckCallTimes(done, 5)
    })
  })

  describe('ctrlSelectRow', () => {
    it('selectable = false', async (done) => {
      props.selectable = selectableCases[1]
      const { ctrlSelectRow } = useSelectableRow(paginatedRows, props, emit)

      ctrlSelectRow(paginatedRows.value[0])
      expect(emit).toHaveBeenCalledTimes(0)

      await doneAfterCheckCallTimes(done, 0)
    })

    it('selectMode = single', async (done) => {
      props.selectMode = selectModes[0]
      const { ctrlSelectRow } = useSelectableRow(paginatedRows, props, emit)
      const targetRow = paginatedRows.value[0]

      ctrlSelectRow(targetRow)
      expectUpdateModelValue(1, [0])

      props.modelValue = sources([0, 1])
      await expectSelectionChange(2, [0, 1], [])

      ctrlSelectRow(targetRow)
      expectUpdateModelValue(3, [1])

      props.modelValue = sources([0])
      await expectSelectionChange(4, [0], [0, 1])

      ctrlSelectRow(targetRow)
      expectUpdateModelValue(5, [])

      await doneAfterCheckCallTimes(done, 5)
    })

    it('selectMode = multiple', async (done) => {
      const { ctrlSelectRow } = useSelectableRow(paginatedRows, props, emit)
      const targetRow = paginatedRows.value[0]

      ctrlSelectRow(targetRow)
      expectUpdateModelValue(1, [0])

      props.modelValue = sources([0, 1])
      await expectSelectionChange(2, [0, 1], [])

      ctrlSelectRow(targetRow)
      expectUpdateModelValue(3, [1])

      props.modelValue = sources([2, 3])
      await expectSelectionChange(4, [2, 3], [0, 1])

      ctrlSelectRow(targetRow)
      expectUpdateModelValue(5, [2, 3, 0])

      await doneAfterCheckCallTimes(done, 5)
    })
  })

  describe('shiftSelectRows', () => {
    it('selectable = false', async (done) => {
      props.selectable = selectableCases[1]
      const { shiftSelectRows } = useSelectableRow(paginatedRows, props, emit)

      shiftSelectRows(paginatedRows.value[0])
      expect(emit).toHaveBeenCalledTimes(0)

      await doneAfterCheckCallTimes(done, 0)
    })

    it('selectMode = single', async (done) => {
      props.selectMode = selectModes[0]
      const { shiftSelectRows } = useSelectableRow(paginatedRows, props, emit)
      const targetRow = paginatedRows.value[0]

      shiftSelectRows(targetRow)
      expectUpdateModelValue(1, [0])

      props.modelValue = sources([0, 1])
      await expectSelectionChange(2, [0, 1], [])

      shiftSelectRows(targetRow)
      expectUpdateModelValue(3, [1])

      props.modelValue = sources([0])
      await expectSelectionChange(4, [0], [0, 1])

      shiftSelectRows(targetRow)
      expectUpdateModelValue(5, [])

      await doneAfterCheckCallTimes(done, 5)
    })

    it('selectMode = multiple', async (done) => {
      const { shiftSelectRows } = useSelectableRow(paginatedRows, props, emit)

      shiftSelectRows(paginatedRows.value[1]) // prevSelectedRowIndex: -1 ==> 1
      expectUpdateModelValue(1, [1])

      props.modelValue = sources([1])
      await expectSelectionChange(2, [1], [])

      shiftSelectRows(paginatedRows.value[5]) // prevSelectedRowIndex: 1 ==> 5
      expectUpdateModelValue(3, [1, 2, 3, 4, 5])

      props.modelValue = sources([1, 2, 3, 4, 5])
      await expectSelectionChange(4, [1, 2, 3, 4, 5], [1])

      shiftSelectRows(paginatedRows.value[4]) // prevSelectedRowIndex: 5 ==> 4
      expectUpdateModelValue(5, [1, 2, 3, 5])

      props.modelValue = sources([1, 2, 3, 5])
      await expectSelectionChange(6, [1, 2, 3, 5], [1, 2, 3, 4, 5])

      shiftSelectRows(paginatedRows.value[2]) // prevSelectedRowIndex: 4 ==> 2
      expectUpdateModelValue(7, [1, 5])

      await doneAfterCheckCallTimes(done, 7)
    })
  })
})
