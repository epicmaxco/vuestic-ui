import { Table, TableDataRow } from '@/components/DocsTable/DocsTableTypes'
import { isNil } from 'lodash'
import { readStyleVariablesFileByComponentName } from '@/helpers/ReadHelper'
import { parseCSSVariablesFromPlainText } from '@/helpers/parseCSSVariablesFromPlainText'

const makeVariableColumns = (matchResult: string[]): TableDataRow => {
  return [
    matchResult?.[2],
    matchResult?.[3],
  ]
}
const makeTitleColumns = (matchResult: string[]): TableDataRow => {
  return [
    matchResult[7],
  ]
}
const makeSubtitleColumns = (matchResult: string[]): TableDataRow => {
  return [
    matchResult[5],
  ]
}

const getExpressionType = (matchResult: string[]): 'title' | 'subtitle' | 'variable' => {
  if (matchResult?.[7]) {
    return 'title'
  } else if (matchResult?.[5]) {
    return 'subtitle'
  } else {
    return 'variable'
  }
}

export const makeTableFromComponent = (componentName: string): Table | null => {
  const cssVariablesAsPlainText = readStyleVariablesFileByComponentName(componentName)
  const parsedCssVariablesArray = parseCSSVariablesFromPlainText(cssVariablesAsPlainText)

  if (isNil(parsedCssVariablesArray)) { return null }

  return {
    columns: [
      { title: 'variable name', type: 'plain' as const },
      { title: 'default value', type: 'code' as const },
    ],
    tableData: [...parsedCssVariablesArray].map((matchExpression) => {
      const expressionType = getExpressionType(matchExpression)
      let tableRow: TableDataRow = []
      switch (expressionType) {
      case 'title':
        tableRow = makeTitleColumns(matchExpression)
        break
      case 'subtitle':
        tableRow = makeSubtitleColumns(matchExpression)
        break
      case 'variable':
        tableRow = makeVariableColumns(matchExpression)
        break
      default:
        tableRow = []
        break
      }
      return tableRow
    }),
  }
}
