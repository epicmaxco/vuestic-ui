import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

const config: ApiDocsBlock[] = [
  DocsHelper.title('ag-grid-wrapper.title'),
  DocsHelper.paragraph('Если нужен более гибкая настройка отображения таблиц, то мы рекомендуем воспользоваться библиотекой <a href="https://www.ag-grid.com/vue-data-grid/getting-started">AG Grid</a>. Vuestic UI предостовляет готовую тему стилей для этой библиотеки.'),
  DocsHelper.headline('Установка AG Grid'),
  DocsHelper.paragraph('Для того чтобы начать пользоваться AG Grid, установите зависимости в свой проект.'),
  DocsHelper.code('npm install ag-grid-vue3 ag-grid-community vue-class-component@next\n// $t(\'all.code.or\')\nyarn add ag-grid-vue3 ag-grid-community vue-class-component@next', 'bash'),
  DocsHelper.paragraph('Затем сделайте импорт стилей, которые задают каркас таблиц и примените тему `ag-grid-vuestic` на компоненте таблицы.'),
  DocsHelper.code('<template>\n  <ag-grid-vue class="ag-grid-vuestic" ... />\n</template>', 'html'),
  DocsHelper.code('<style lang="scss">\n  @import "ag-grid-community/dist/styles/ag-grid.css";\n</style>', 'scss'),
  ...DocsHelper.exampleBlock('Стилизация простой таблицы', 'Для правильного рендеринга размеров ячеек необходимо передать компоненту таблицы минимальный набор свойст: rowHeight, headerHeight и minColWidth.', 'grid/AgGrid'),
]

export default config
