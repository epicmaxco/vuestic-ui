import { SFCDescriptor } from "@vue/compiler-sfc";
import { extractScriptStaticValues } from './script-static-values'

/** Context for all nodes in source file */
export const createSourceFileContext = (sfc: SFCDescriptor) => {
  return extractScriptStaticValues(sfc)
}

export type CompilerSourceFileContext = ReturnType<typeof createSourceFileContext>
