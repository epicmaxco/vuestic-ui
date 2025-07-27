import ts from 'typescript'
import { basename, dirname, resolve } from "path";
import { writeFile, mkdtemp, rm } from 'fs/promises'
import { randomUUID } from 'crypto'
import { logger } from '../logger';

export const executeModule = async <T>(scriptCode: string, filePath: string) => {
  if (!filePath) {
    filePath = randomUUID()
  }

  const fileName = basename(filePath)
  const dirName = dirname(filePath)

  const tempFileName = resolve(dirName, fileName + `${randomUUID()}-vc.mjs`)

  try {
    await writeFile(tempFileName, scriptCode)

    const module = await import(tempFileName)

    return module as T
  }
  catch (e) {
    logger.error(typeof e === 'string' ? e : e instanceof Error ? e.message : 'Unknown error', {
      timestamp: true
    })
  }
  finally {
    await rm(tempFileName, { recursive: true, force: true })
  }
};

export const executeTsModule = async <T>(scriptCode: string, filePath: string) => {
  const transpiled = transpileTs(scriptCode)

  return executeModule<T>(transpiled.outputText, filePath)
}

export const transpileTs = (code: string) => {
  return ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext,
      strict: false,
    },
  })
}
