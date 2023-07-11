import { glob } from 'fast-glob'
import { join, relative } from 'pathe'

export const generateComponentsList = async (options: {
  componentsDir?: string,
  cwd?: string,
}) => {
  const { componentsDir = '/src/components/*/*.vue', cwd = '' } = options

  const files = await glob(join(cwd, componentsDir))

  const componentsList = files
    .map(fullPath => ({
      name: fullPath.split('/').slice(-1)[0].replace('.vue', ''),
      path: relative(cwd, fullPath),
      fullPath,
    }))

  return componentsList
}