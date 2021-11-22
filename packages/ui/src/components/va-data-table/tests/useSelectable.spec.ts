import { Ref, ref, nextTick } from 'vue'
import { TableRow, ITableItem } from '../hooks/useRows'
import useSelectable, { TSelectMode, TSelectionChange } from '../hooks/useSelectable'

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
const sortedRows = ref(rawRows.slice(0, 6))
const selectedItems: Ref<ITableItem[]> = ref([])
const selectable = ref(selectableCases[0])
const selectMode = ref(selectModes[1])
let emit = jest.fn()

// helpers
type TSources = number[] | 'all'
const sources = (rowIndexes: TSources): ITableItem[] => {
  if (rowIndexes === 'all') {
    return sortedRows.value.map(row => row.source)
  }
  return rowIndexes.map(i => sortedRows.value[i].source)
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

describe('useSelectable (vaDataTable hook)', () => {
  afterEach(() => {
    selectedItems.value = []
    selectable.value = selectableCases[0]
    selectMode.value = selectModes[1]
    emit = jest.fn()
    jest.clearAllMocks()
  })

  it('noRowsSelected', async (done) => {
    const { noRowsSelected } = useSelectable(sortedRows, selectedItems, selectable, selectMode, emit)

    expect(noRowsSelected.value).toBe(true)

    selectedItems.value = sources([0])
    await expectSelectionChange(1, [0], [])
    expect(noRowsSelected.value).toBe(false)

    await doneAfterCheckCallTimes(done, 1)
  })

  it('severalRowsSelected', async (done) => {
    const { severalRowsSelected } = useSelectable(sortedRows, selectedItems, selectable, selectMode, emit)

    expect(severalRowsSelected.value).toBe(false)

    selectedItems.value = sources([0])
    await expectSelectionChange(1, [0], [])
    expect(severalRowsSelected.value).toBe(true)

    selectedItems.value = sources('all')
    await expectSelectionChange(2, 'all', [0])
    expect(severalRowsSelected.value).toBe(false)

    await doneAfterCheckCallTimes(done, 2)
  })

  it('allRowsSelected', async (done) => {
    const sortedRows = ref(rawRows.slice(0, 6))
    const { allRowsSelected } = useSelectable(sortedRows, selectedItems, selectable, selectMode, emit)

    expect(allRowsSelected.value).toBe(false)

    selectedItems.value = sources([0])
    await expectSelectionChange(1, [0], [])
    expect(allRowsSelected.value).toBe(false)

    selectedItems.value = sources('all')
    await expectSelectionChange(2, 'all', [0])
    expect(allRowsSelected.value).toBe(true)

    sortedRows.value = []
    await nextTick()
    expectUpdateModelValue(3, [])
    expect(allRowsSelected.value).toBe(false)

    await doneAfterCheckCallTimes(done, 3)
  })

  it('isRowSelected', async (done) => {
    const { isRowSelected } = useSelectable(sortedRows, selectedItems, selectable, selectMode, emit)
    const targetRow = sortedRows.value[0]

    expect(isRowSelected(targetRow)).toBe(false)

    selectedItems.value = sources([0])
    await expectSelectionChange(1, [0], [])
    expect(isRowSelected(targetRow)).toBe(true)

    selectedItems.value = sources('all')
    await expectSelectionChange(2, 'all', [0])
    expect(isRowSelected(targetRow)).toBe(true)

    selectedItems.value = []
    await expectSelectionChange(3, [], 'all')
    expect(isRowSelected(targetRow)).toBe(false)

    await doneAfterCheckCallTimes(done, 3)
  })

  it('toggleBulkSelection', async (done) => {
    const { toggleBulkSelection } = useSelectable(sortedRows, selectedItems, selectable, selectMode, emit)

    toggleBulkSelection()
    expectUpdateModelValue(1, 'all')

    selectedItems.value = sources('all')
    await expectSelectionChange(2, 'all', [])

    toggleBulkSelection()
    expectUpdateModelValue(3, [])

    selectedItems.value = sources([0])
    await expectSelectionChange(4, [0], 'all')

    toggleBulkSelection()
    expectUpdateModelValue(5, 'all')

    await doneAfterCheckCallTimes(done, 5)
  })

  describe('toggleRowSelection"', () => {
    it('selectable = false', async (done) => {
      const selectableFalse = ref(selectableCases[1])
      const { toggleRowSelection } = useSelectable(sortedRows, selectedItems, selectableFalse, selectMode, emit)

      toggleRowSelection(sortedRows.value[0])
      expect(emit).toHaveBeenCalledTimes(0)

      await doneAfterCheckCallTimes(done, 0)
    })

    it('selectable = true', async (done) => {
      const { toggleRowSelection } = useSelectable(sortedRows, selectedItems, selectable, selectMode, emit)
      const targetRow = sortedRows.value[0]

      toggleRowSelection(targetRow)
      expectUpdateModelValue(1, [0])

      selectedItems.value = sources([0, 1])
      await expectSelectionChange(2, [0, 1], [])

      toggleRowSelection(targetRow)
      expectUpdateModelValue(3, [1])

      selectedItems.value = sources([0])
      await expectSelectionChange(4, [0], [0, 1])

      toggleRowSelection(targetRow)
      expectUpdateModelValue(5, [])

      await doneAfterCheckCallTimes(done, 5)
    })
  })

  describe('ctrlSelectRow', () => {
    it('selectable = false', async (done) => {
      const selectableFalse = ref(selectableCases[1])
      const { ctrlSelectRow } = useSelectable(sortedRows, selectedItems, selectableFalse, selectMode, emit)

      ctrlSelectRow(sortedRows.value[0])
      expect(emit).toHaveBeenCalledTimes(0)

      await doneAfterCheckCallTimes(done, 0)
    })

    it('selectMode = single', async (done) => {
      const singleSelectMode = ref(selectModes[0])
      const { ctrlSelectRow } = useSelectable(sortedRows, selectedItems, selectable, singleSelectMode, emit)
      const targetRow = sortedRows.value[0]

      ctrlSelectRow(targetRow)
      expectUpdateModelValue(1, [0])

      selectedItems.value = sources([0, 1])
      await expectSelectionChange(2, [0, 1], [])

      ctrlSelectRow(targetRow)
      expectUpdateModelValue(3, [1])

      selectedItems.value = sources([0])
      await expectSelectionChange(4, [0], [0, 1])

      ctrlSelectRow(targetRow)
      expectUpdateModelValue(5, [])

      await doneAfterCheckCallTimes(done, 5)
    })

    it('selectMode = multiple', async (done) => {
      const { ctrlSelectRow } = useSelectable(sortedRows, selectedItems, selectable, selectMode, emit)
      const targetRow = sortedRows.value[0]

      ctrlSelectRow(targetRow)
      expectUpdateModelValue(1, [0])

      selectedItems.value = sources([0, 1])
      await expectSelectionChange(2, [0, 1], [])

      ctrlSelectRow(targetRow)
      expectUpdateModelValue(3, [1])

      selectedItems.value = sources([2, 3])
      await expectSelectionChange(4, [2, 3], [0, 1])

      ctrlSelectRow(targetRow)
      expectUpdateModelValue(5, [2, 3, 0])

      await doneAfterCheckCallTimes(done, 5)
    })
  })

  describe('shiftSelectRows', () => {
    it('selectable = false', async (done) => {
      const selectableFalse = ref(selectableCases[1])
      const { shiftSelectRows } = useSelectable(sortedRows, selectedItems, selectableFalse, selectMode, emit)

      shiftSelectRows(sortedRows.value[0])
      expect(emit).toHaveBeenCalledTimes(0)

      await doneAfterCheckCallTimes(done, 0)
    })

    it('selectMode = single', async (done) => {
      const singleSelectMode = ref(selectModes[0])
      const { shiftSelectRows } = useSelectable(sortedRows, selectedItems, selectable, singleSelectMode, emit)
      const targetRow = sortedRows.value[0]

      shiftSelectRows(targetRow)
      expectUpdateModelValue(1, [0])

      selectedItems.value = sources([0, 1])
      await expectSelectionChange(2, [0, 1], [])

      shiftSelectRows(targetRow)
      expectUpdateModelValue(3, [1])

      selectedItems.value = sources([0])
      await expectSelectionChange(4, [0], [0, 1])

      shiftSelectRows(targetRow)
      expectUpdateModelValue(5, [])

      await doneAfterCheckCallTimes(done, 5)
    })

    it('selectMode = multiple', async (done) => {
      const { shiftSelectRows } = useSelectable(sortedRows, selectedItems, selectable, selectMode, emit)

      shiftSelectRows(sortedRows.value[1]) // prevSelectedRowIndex: -1 ==> 1
      expectUpdateModelValue(1, [1])

      selectedItems.value = sources([1])
      await expectSelectionChange(2, [1], [])

      shiftSelectRows(sortedRows.value[5]) // prevSelectedRowIndex: 1 ==> 5
      expectUpdateModelValue(3, [1, 2, 3, 4, 5])

      selectedItems.value = sources([1, 2, 3, 4, 5])
      await expectSelectionChange(4, [1, 2, 3, 4, 5], [1])

      shiftSelectRows(sortedRows.value[4]) // prevSelectedRowIndex: 5 ==> 4
      expectUpdateModelValue(5, [1, 2, 3, 5])

      selectedItems.value = sources([1, 2, 3, 5])
      await expectSelectionChange(6, [1, 2, 3, 5], [1, 2, 3, 4, 5])

      shiftSelectRows(sortedRows.value[2]) // prevSelectedRowIndex: 4 ==> 2
      expectUpdateModelValue(7, [1, 5])

      await doneAfterCheckCallTimes(done, 7)
    })
  })
})
