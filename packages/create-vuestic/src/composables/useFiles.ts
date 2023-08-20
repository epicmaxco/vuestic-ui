import { resolvePath } from "../utils/resolve-path"
import { dirname, resolve } from "path"
import { useUserAnswers } from "./useUserAnswers"
import { mkdir, readFile, writeFile } from "fs/promises"
import { existsSync } from "fs"

export const useFiles = async () => {
  const { projectName } = await useUserAnswers()

  const resolveCorrectExt = (path: string, ext: string[]) => {
    for (const e of ext) {
      const resolvedPath = resolve(process.cwd(), projectName, `${path}.${e}`)

      if (resolvedPath) {
        return resolvedPath
      }
    }

    return null
  }

  const addFile = async (path: string, content: string) => {
    const resolvedPath = resolve(process.cwd(), projectName, path)

    const dir = dirname(resolvedPath)

    console.log(dir, resolvedPath)

    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true })
    }

    return writeFile(resolvedPath, content, { encoding: 'utf-8', flag: 'wx' })
  }

  const replaceFileContent = async (path: string, content: (existingContent: string) => string) => {
    const resolvedPath = resolvePath(process.cwd(), projectName, path)

    if (!resolvedPath) {
      throw new Error(`Unexpected error: Could not find ${path}`)
    }

    const existingContent = (await readFile(resolvedPath)).toString()

    return writeFile(resolvedPath, content(existingContent))
  }

  const addToTopOfFile = async (path: string, content: string) => {
    return replaceFileContent(path, (existingContent) => {
      return `${content}\n${existingContent}`
    })
  }

  return {
    addToTopOfFile,
    addFile,
    replaceFileContent,
    resolveCorrectExt,
  }
}
