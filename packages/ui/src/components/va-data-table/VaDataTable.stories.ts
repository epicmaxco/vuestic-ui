import { DataTableSortingOrder, VaDataTable } from './'
import { VaAlert } from '../va-alert'
import { VaSwitch } from '../va-switch'
import { VaChip } from '../va-chip'
import { shuffle } from 'lodash'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { sleep } from '../../utils/sleep'

const tableSetup = {
  data () {
    const users = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '-37.3159',
            lng: '81.1496',
          },
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets',
        },
      },
      {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        address: {
          street: 'Victor Plains',
          suite: 'Suite 879',
          city: 'Wisokyburgh',
          zipcode: '90566-7771',
          geo: {
            lat: '-43.9509',
            lng: '-34.4618',
          },
        },
        phone: '010-692-6593 x09125',
        website: 'anastasia.net',
        company: {
          name: 'Deckow-Crist',
          catchPhrase: 'Proactive didactic contingency',
          bs: 'synergize scalable supply-chains',
        },
      },
      {
        id: 3,
        name: 'Clementine Bauch',
        username: 'Samantha',
        email: 'Nathan@yesenia.net',
        address: {
          street: 'Douglas Extension',
          suite: 'Suite 847',
          city: 'McKenziehaven',
          zipcode: '59590-4157',
          geo: {
            lat: '-68.6102',
            lng: '-47.0653',
          },
        },
        phone: '1-463-123-4447',
        website: 'ramiro.info',
        company: {
          name: 'Romaguera-Jacobson',
          catchPhrase: 'Face to face bifurcated interface',
          bs: 'e-enable strategic applications',
        },
      },
      {
        id: 4,
        name: 'Patricia Lebsack',
        username: 'Karianne',
        email: 'Julianne.OConner@kory.org',
        address: {
          street: 'Hoeger Mall',
          suite: 'Apt. 692',
          city: 'South Elvis',
          zipcode: '53919-4257',
          geo: {
            lat: '29.4572',
            lng: '-164.2990',
          },
        },
        phone: '493-170-9623 x156',
        website: 'kale.biz',
        company: {
          name: 'Robel-Corkery',
          catchPhrase: 'Multi-tiered zero tolerance productivity',
          bs: 'transition cutting-edge web services',
        },
      },
      {
        id: 5,
        name: 'Chelsey Dietrich',
        username: 'Kamren',
        email: 'Lucio_Hettinger@annie.ca',
        address: {
          street: 'Skiles Walks',
          suite: 'Suite 351',
          city: 'Roscoeview',
          zipcode: '33263',
          geo: {
            lat: '-31.8129',
            lng: '62.5342',
          },
        },
        phone: '(254)954-1289',
        website: 'demarco.info',
        company: {
          name: 'Keebler LLC',
          catchPhrase: 'User-centric fault-tolerant solution',
          bs: 'revolutionize end-to-end systems',
        },
      },
    ]

    const columns = [
      { key: 'username', sortable: true },
      { key: 'email', sortable: true },
      { key: 'name', sortable: true },
      { key: 'id', sortable: true, sortingFn: () => -1 },
      { key: 'address.street', name: 'street', label: 'Street', sortable: true },
      { key: 'company.name', name: 'companyName', sortable: true },
    ]

    return {
      items: users,
      itemsHuge: new Array(500).fill(null).map((_, idx) => idx % 2 ? users[0] : users[1]),
      columns,

      filter: '',
      useCustomFilteringFn: false,
      filteredCount: users.length,

      sortBy: 'username',
      sortingOrder: 'asc' as DataTableSortingOrder,

      isTableLoading: false,
      isTableStriped: false,
      isTableRowsClickable: false,
      isRowBind: true,
      isCellBind: false,
      isHeaderSticky: true,
      isFooterSticky: true,
      hideDefaultHeader: false,
      footerClone: false,
      footerSorting: true,
      prependSlot: false,
      appendSlot: false,
      animated: true,
      selectable: true,
      selectedItems: [] as { id: number }[],
      multiple: false,
      selectedColor: 'danger',

      width: 300,
      delay: 1000,

      perPage: 2,
      currentPage: 1,

      rowEventType: '',
      rowId: '',
    }
  },

  computed: {
    customFilteringFn () {
      return (this as any).useCustomFilteringFn ? (this as any).filterExact : undefined
    },
  },

  methods: {
    shuffleItems () {
      (this as any).items = shuffle((this as any).items)
    },

    filterExact (source: any) {
      return source?.toString?.() === (this as any).filter
    },

    getCustomRowClass (item: Record<string, any>) {
      return (item.name === 'Ervin Howell')
        ? { class: 'line-through' }
        : undefined
    },

    getCustomCellClass (cell: any, row: any, column: Record<string, any>) {
      return (column.key === 'name')
        ? { class: 'text-red-500' }
        : undefined
    },

    handleClick (event: any) {
      this.rowEventType = event.event.type
      this.rowId = event.item.id
    },
  },
}

export default {
  title: 'VaDataTable',
  component: VaDataTable,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaDataTable },
  ...tableSetup,
  template: `
    <va-data-table
      :items="items"
      :columns="columns"
    />
  `,
})

Default.play = async ({ step }) => {
  await step('Should sort on Username click', async () => {
    const headerUsernameColumn = document.querySelector('thead > tr.va-data-table__table-tr > th') as HTMLElement
    userEvent.click(headerUsernameColumn)
    await sleep()
    const firstTableRowUsername = document.querySelector('tbody > tr.va-data-table__table-tr > td') as HTMLElement
    expect(firstTableRowUsername.textContent).toEqual(' Antonette')
  })

  await step('Should sort on ID click', async () => {
    const headerIDColumn = document.querySelector('thead > tr.va-data-table__table-tr > th:nth-child(4)') as HTMLElement
    userEvent.click(headerIDColumn)
    await sleep()
    const firstTableRowID = document.querySelector('tbody > tr.va-data-table__table-tr > td:nth-child(4)') as HTMLElement
    expect(firstTableRowID.textContent).toEqual(' 5')
  })
}

export const GridMode = () => ({
  components: { VaDataTable },
  ...tableSetup,
  template: `
    <va-data-table
      :items="items"
      :columns="columns"
      grid
    />
  `,
})

export const VirtualScroll = () => ({
  components: { VaDataTable, VaSwitch },
  ...tableSetup,
  template: `
    <div class="space-x-2 mb-6">
      <va-switch
        v-model="isHeaderSticky"
        label="Sticky Header"
        size="small"
      />
      <va-switch
        v-model="isFooterSticky"
        label="Sticky Footer"
        size="small"
      />
    </div>
    <va-data-table
      :items="itemsHuge"
      :columns="columns"
      :wrapper-size="400"
      :item-size="44"
      virtual-scroller
      footer-clone
      :sticky-header="isHeaderSticky"
      :sticky-footer="isFooterSticky"
    />
  `,
})

export const CellSlots = () => ({
  components: { VaDataTable },
  ...tableSetup,
  template: `
    <va-data-table :items="items">
      <template #cell(address)="{ rowData }">{{ rowData.address.street }}</template>
      <template #cell(company)="{ rowData }">{{ rowData.company.name }}</template>
    
      <template #colgroup>
        <col v-for="i in 8" :class="[5, 8].includes(i) ? 'border border-blue-700' : ''">
      </template>
    </va-data-table>
  `,
})

export const ColgroupSlot = () => ({
  components: { VaDataTable },
  ...tableSetup,
  template: `
    <div class="space-x-2 mb-6">
      <input id="widthInput" placeholder="Width..." class="p-2 rounded-sm border" type="text" v-model="width">
      <label for="widthInput">Column width (works only when there is enough room)</label>
    </div>
    <va-data-table 
      :items="items"
      :columns="columns"
    >
      <template #colgroup>
        <col>
        <col :width="width" class="border border-blue-700">
      </template>
    </va-data-table>
  `,
})

export const RowAndCellBind = () => ({
  components: { VaDataTable, VaSwitch },
  ...tableSetup,
  template: `
    <div class="space-x-2">
      <va-switch
        v-model="isRowBind"
        label="Row bind"
        size="small"
      />
      <va-switch
        v-model="isCellBind"
        label="Cell Bind"
        size="small"
      />
    </div>
    <va-data-table
      :items="items"
      :columns="[
        { key: 'username', sortable: true, width: '30px' },
        { key: 'email', sortable: true, width: '200px' },
        { key: 'name', sortable: true },
      ]"
      :selectable="selectable"
      :select-mode="selectMode"
      :row-bind="isRowBind && getCustomRowClass"
      :cell-bind="isCellBind && getCustomCellClass"
      v-model="selectedItems"
    >
      <template #header(username)>U</template>
      <template #cell(username)="{ rowData }">{{ rowData.username[0] }}</template>
    </va-data-table>
  `,
})

export const Filtering = () => ({
  components: { VaDataTable },
  ...tableSetup,
  template: `
    <div class="space-x-2 mb-6">
      <input placeholder="Search..." class="p-2 rounded-sm border" type="text" v-model="filter">
      <input id="useCustomFunction" type="checkbox" v-model="useCustomFilteringFn">
      <label for="useCustomFunction">Use custom filtering function (looks for an exact match)</label>
    </div>
    <va-data-table
      :items="items"
      :columns="columns"
      :filter="filter"
      :filter-method="customFilteringFn"
    />
  `,
})

Filtering.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const searchInput = canvas.getByRole('textbox', { name: '' }) as HTMLElement
  const checkbox = canvas.getByRole('checkbox', { name: 'Use custom filtering function (looks for an exact match)' }) as HTMLElement

  await step('Should find Ervin Howell, Patricia Lebsack and Chelsey Dietrich by typing \'el\'', async () => {
    userEvent.type(searchInput, 'el')
    await sleep(500)

    const [first, second, third] = document.querySelectorAll('tbody > tr.va-data-table__table-tr')
    expect(first.children[2].textContent).toEqual(' Ervin Howell')
    expect(second.children[2].textContent).toEqual(' Patricia Lebsack')
    expect(third.children[2].textContent).toEqual(' Chelsey Dietrich')
  })

  await step('Should find Leanne Graham by typing \'Bret\'', async () => {
    userEvent.clear(searchInput)
    userEvent.click(checkbox)
    userEvent.type(searchInput, 'Bret')
    await sleep(500)

    const first = document.querySelector('tbody > tr.va-data-table__table-tr') as HTMLElement
    expect(first.children[2].textContent).toEqual(' Leanne Graham')
  })
}

export const Delay = () => ({
  components: { VaDataTable },
  ...tableSetup,
  template: `
    <div class="space-x-2 mb-6">
      <input id="delayInput" placeholder="Delay..." class="p-2 rounded-sm border" type="text" v-model="delay">
      <label for="delayInput">Delay</label>
    </div>
    <va-data-table
      v-model:sort-by="sortBy"
      v-model:sorting-order="sortingOrder"
      :items="items"
      :columns="columns"
      :delay="delay"
    />
  `,
})

Delay.play = async ({ step }) => {
  await step('Should wait for 1000 ms', async () => {
    const headerUsernameColumn = document.querySelector('thead > tr.va-data-table__table-tr > th') as HTMLElement
    userEvent.click(headerUsernameColumn)
    await sleep()
    const firstTableRowUsernameBeforeSorting = document.querySelector('tbody > tr.va-data-table__table-tr > td') as HTMLElement
    expect(firstTableRowUsernameBeforeSorting.textContent).toEqual(' Antonette')
    await sleep(1000)
    const firstTableRowUsernameAfterSorting = document.querySelector('tbody > tr.va-data-table__table-tr > td') as HTMLElement
    expect(firstTableRowUsernameAfterSorting.textContent).toEqual(' Samantha')
  })
}

export const Selection = () => ({
  components: { VaDataTable, VaSwitch },
  ...tableSetup,
  template: `
    <va-switch
      v-model="multiple"
      label="Multiple"
      size="small"
    />
    <va-data-table
      :items="items"
      :columns="columns"
      selectable
      v-model="selectedItems"
      :select-mode="multiple ? 'multiple' : 'single'"
    />
  `,
})

Selection.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const multipleSwitch = canvas.getByRole('switch', { name: 'Multiple' }) as HTMLElement
  const rows = document.querySelectorAll('tr.va-data-table__table-tr')
  const [firstRowCheckbox, secondRowCheckbox, thirdRowCheckbox] = document.querySelectorAll('div.va-checkbox__square')

  await step('Should select on click', async () => {
    userEvent.click(firstRowCheckbox)
    await sleep()
    expect(rows[1]).toHaveClass('va-data-table__table-tr selected')
  })

  await step('Should deselect on click', async () => {
    userEvent.click(firstRowCheckbox)
    await sleep()
    expect(rows[1]).toHaveClass('va-data-table__table-tr')
  })

  await step('Selecting another, deselect previous', async () => {
    userEvent.click(secondRowCheckbox)
    await sleep()
    expect(rows[2]).toHaveClass('va-data-table__table-tr selected')
    expect(rows[1]).toHaveClass('va-data-table__table-tr')
  })

  await step('Should select multiple', async () => {
    userEvent.click(multipleSwitch)
    await sleep()
    userEvent.click(thirdRowCheckbox)
    await sleep()
    expect(rows[3]).toHaveClass('va-data-table__table-tr selected')
    expect(rows[2]).toHaveClass('va-data-table__table-tr selected')
  })
}

export const Pagination = () => ({
  components: { VaDataTable },
  ...tableSetup,
  template: `
    <div class="space-x-2 mb-6">
      <input
        v-model="perPage"
        id="perPage"
        class="p-2 rounded-sm border"
        type="number"
        placeholder="Items..."
        label="Items per page"
      />
      <label for="perPage">Items per page</label>
      <input
        v-model="currentPage"
        id="currentPage"
        class="p-2 rounded-sm border"
        type="number"
        placeholder="Page..."
        label="Current page"
      />
      <label for="currentPage">Current page</label>
    </div>
    <va-data-table
      :items="items"
      :columns="columns"
      :per-page="perPage"
      :current-page="currentPage"
    />
  `,
})

Pagination.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const currentPage = canvas.getByRole('spinbutton', { name: 'Current page' }) as HTMLElement
  const rows = document.querySelector('tbody.va-data-table__table-tbody') as HTMLElement

  await step('Should have 2 items on page 1', async () => {
    expect(rows.childElementCount).toEqual(2)
    userEvent.clear(currentPage)
  })

  await step('Should have 1 item on page 3', async () => {
    userEvent.type(currentPage, '3')
    await sleep(500)
    expect(rows.childElementCount).toEqual(1)
  })
}

export const Other = () => ({
  components: { VaDataTable, VaAlert, VaChip, VaSwitch },
  ...tableSetup,
  template: `
    <div class="grid sm:grid-cols-3 gap-6 mb-6">
      <div>
        <va-switch
          v-model="isTableStriped"
          label="Striped"
          size="small"
        />
        <br>
        <va-switch
          v-model="animated"
          label="Animated"
          size="small"
        />
        <br>
        <va-switch
          v-model="isTableRowsClickable"
          label="Clickable"
          size="small"
        />
      </div>
      <div>
        <va-switch
          v-model="isTableLoading"
          label="Loading"
          size="small"
        />
        <br>
        <va-switch
          v-model="prependSlot"
          label="Prepend slots"
          size="small"
        />
        <br>
        <va-switch
          v-model="appendSlot"
          label="Append slots"
          size="small"
        />
      </div>
      <div>
        <va-switch
          v-model="hideDefaultHeader"
          label="Hide header"
          size="small"
        />
        <br>
        <va-switch
          v-model="footerClone"
          label="Clone footer"
          size="small"
          :disabled="hideDefaultHeader"
        />
        <br>
        <va-switch
          v-model="footerSorting"
          label="Foot sorting"
          size="small"
          :disabled="hideDefaultHeader || !footerClone"
        />
      </div>
    </div>
    <va-data-table
      :items="items"
      :columns="columns"
      :clickable="isTableRowsClickable"
      :striped="isTableStriped"
      :loading="isTableLoading"
      :hide-default-header="hideDefaultHeader"
      :footer-clone="footerClone"
      :allow-footer-sorting="footerSorting"
      :animated="animated"
      @row:click="handleClick"
      @row:dblclick="handleClick"
      @row:contextmenu="handleClick"
    >
      <template
        v-if="prependSlot"
        #headerPrepend
      >
        <tr>
          <th colspan="8" class="text-center" header-prepend>
            Custom cell which span 8 cells (headPrepend slot)
          </th>
        </tr>
      </template>
      <template
        v-if="appendSlot"
        #headerAppend
      >
        <tr>
          <th colspan="8" class="text-center" header-append>
            Custom cell which span 8 cells (headAppend slot)
          </th>
        </tr>
      </template>

      <template
        v-if="prependSlot"
        #footerPrepend
      >
        <tr>
          <th colspan="8" class="text-center" footer-prepend>
            Custom cell which span 8 cells (footPrepend slot)
          </th>
        </tr>
      </template>
      <template
        v-if="appendSlot"
        #footerAppend
      >
        <tr>
          <th colspan="8" class="text-center" footer-append>
            Custom cell which span 8 cells (footAppend slot)
          </th>
        </tr>
      </template>
    </va-data-table>
    <va-alert 
      v-if="isTableRowsClickable"
      class="mt-3" 
      border="left"
    >
      <span class="space-x-2">
        Last row click event (id, event type):
        <va-chip v-if="rowId">{{ rowId }}</va-chip>
        <va-chip v-if="rowEventType">{{ rowEventType }}</va-chip>
      </span>
    </va-alert>
  `,
})

Other.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const table = document.querySelector('table.va-data-table__table') as HTMLElement

  const stripedSwitch = canvas.getByRole('switch', { name: 'Striped' }) as HTMLElement
  await step('Should have striped rows', async () => {
    userEvent.click(stripedSwitch)
    await sleep()
    expect(table).toHaveClass('striped')
  })

  const clickableSwitch = canvas.getByRole('switch', { name: 'Clickable' }) as HTMLElement
  await step('Should have clickable rows', async () => {
    userEvent.click(clickableSwitch)
    await sleep()
    expect(table).toHaveClass('clickable')
  })

  const cloneFooter = canvas.getByRole('switch', { name: 'Clone footer' }) as HTMLElement
  await step('Should have footer', async () => {
    userEvent.click(cloneFooter)
    await sleep()
    const footer = document.querySelector('tfoot > tr.va-data-table__table-tr') as HTMLElement
    expect(footer).toBeDefined()
  })

  await step('Should sort on footer Username column click', async () => {
    const footerUsernameColumn = document.querySelector('tfoot > tr.va-data-table__table-tr > th') as HTMLElement
    userEvent.click(footerUsernameColumn)
    await sleep()
    const firstTableRowUsrname = document.querySelector('tbody > tr.va-data-table__table-tr > td') as HTMLElement
    expect(firstTableRowUsrname.textContent).toEqual(' Antonette')
  })

  const hideHeaderSwitch = canvas.getByRole('switch', { name: 'Hide header' }) as HTMLElement
  await step('Should have hidden header', async () => {
    userEvent.click(hideHeaderSwitch)
    await sleep()
    const header = document.querySelector('thead.va-data-table__table-thead') as HTMLElement
    expect(header.children.length).toEqual(0)
  })

  const prependSwitch = canvas.getByRole('switch', { name: 'Prepend slots' }) as HTMLElement
  await step('Should have prepend', async () => {
    userEvent.click(prependSwitch)
    await sleep()
    const prependHeader = document.querySelector('[header-prepend]') as HTMLElement
    const prependFooter = document.querySelector('[footer-prepend]') as HTMLElement
    expect(prependHeader).toBeDefined()
    expect(prependFooter).toBeDefined()
  })

  const appendSwitch = canvas.getByRole('switch', { name: 'Append slots' }) as HTMLElement
  await step('Should have append', async () => {
    userEvent.click(appendSwitch)
    await sleep()
    const appendHeader = document.querySelector('[header-append]') as HTMLElement
    const appendFooter = document.querySelector('[footer-append]') as HTMLElement
    expect(appendHeader).toBeDefined()
    expect(appendFooter).toBeDefined()
  })

  const loadingSwitch = canvas.getByRole('switch', { name: 'Loading' }) as HTMLElement
  await step('Should have loading overlay', async () => {
    userEvent.click(loadingSwitch)
    await sleep()
    const loadingOverlay = document.querySelector('[aria-busy]') as HTMLElement
    expect(loadingOverlay).toHaveAttribute('aria-busy', 'true')
  })
}
