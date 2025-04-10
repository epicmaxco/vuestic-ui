import { parse as parseVue } from "@vue/compiler-sfc"
import { extractScriptStaticValues } from "./script-static-values"

export const processSourceFile = (content: string) => {
  const result = parseVue(content)

  const scriptStaticValues = extractScriptStaticValues(result.descriptor)
}