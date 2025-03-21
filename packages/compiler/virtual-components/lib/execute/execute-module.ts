import { transpileTs } from "./transpile-ts";
import { writeFile, mkdtemp, rm } from 'fs/promises'

export const executeModule = async <T>(scriptCode: string) => {
  const tempDir = await mkdtemp('virtual-component-')
  const tempFile = `${tempDir}/index.ts`
  try {
    await writeFile(tempFile, scriptCode)

    const module = await import(tempFile)

    return module as T
  }
  catch (e) {
    console.error(e)
  }
  finally {
    await rm(tempFile, { recursive: true, force: true })
    await rm(tempDir, { recursive: true, force: true })
  }
};

export const executeTsModule = async <T>(scriptCode: string) => {
  const transpiled = transpileTs(scriptCode)

  return executeModule<T>(transpiled.outputText)
}
