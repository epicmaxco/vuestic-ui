import { existsSync } from "fs"
import { resolvePath } from "./resolve-path"

export const isProjectExists = (projectName: string) => {
  const projectPath = resolvePath(process.cwd(), projectName)!

  return existsSync(projectPath)
}
