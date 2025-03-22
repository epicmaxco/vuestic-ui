import { basename, dirname, resolve } from "path";
import { transpileTs } from "./transpile-ts";
import { writeFile, mkdtemp, rm } from 'fs/promises'
import { randomUUID } from 'crypto'

export const executeModule = async <T>(scriptCode: string, filePath: string) => {
  if (!filePath) {
    filePath = randomUUID()
  }

  const fileName = basename(filePath)
  const dirName = dirname(filePath)

  const tempFileName = resolve(dirName, fileName + '-vc.mjs')

  try {
    await writeFile(tempFileName, scriptCode)

    const module = await import(tempFileName)

    return module as T
  }
  catch (e) {
    console.error(e)
  }
  finally {
    await rm(tempFileName, { recursive: true, force: true })
  }
};

export const executeTsModule = async <T>(scriptCode: string, filePath: string) => {
  const transpiled = transpileTs(scriptCode)

  return executeModule<T>(transpiled.outputText, filePath)
}
