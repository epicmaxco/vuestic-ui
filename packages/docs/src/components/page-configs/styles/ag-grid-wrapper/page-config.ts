import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

const config: ApiDocsBlock[] = [
  DocsHelper.title('ag-grid-wrapper.title'),
  DocsHelper.paragraph('Если нужен более гибкая настройка отображения таблиц, то мы рекомендуем воспользоваться библиотекой <a href="https://www.ag-grid.com/vue-data-grid/getting-started">AG Grid</a>'),
  DocsHelper.example('grid/AgGrid'),
]

export default config
