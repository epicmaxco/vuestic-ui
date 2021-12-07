import { isNil } from 'lodash'

export const parseCSSVariablesFromPlainText = (plainCssText: string | null): RegExpMatchArray[] | null => {
  /*
  * (^\s*?(--[-_a-z]*?):\s*(.*?);?$)| for strings like "--some-variable_and_other: 0.75rem;"
  * (^\s*\/\/\s*(.*?)$)| for strings like "// Some title"
  * (^\s+\/\*\s*(.*?)\s*\*\) for strings like "/* Some title *+/"
  **/
  if (!plainCssText || isNil(plainCssText)) { return null }

  const matches = plainCssText.matchAll(/(^\s*?(--[-_a-z]*?):\s*(.*?);?$)|(^\s*\/\/\s*(.*?)$)|(^\s+\/\*\s*(.*?)\s*\*\/)/gm)

  if (isNil(matches)) { return null }
  return Array.from(matches)
}
