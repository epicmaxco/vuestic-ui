import { parseSource } from "./parseSource"
import { printSource } from "./printSource"

export const prettify = (source: string) => {
  const parsed = parseSource(source)
  return printSource(parsed)
}