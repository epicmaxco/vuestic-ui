import { readFile, writeFile } from 'fs/promises';

import { useUserAnswers } from "./useUserAnswers"

type Package = {
  name: string,
  dependencies: Record<string, string>,
  devDependencies: Record<string, string>,
}

const sortObjectKeys = (obj: Record<string, string>) => {
  return Object
    .keys(obj)
    .sort()
    .reduce((acc, key) => {
      acc[key] = obj[key]
      return acc
    }, {} as Record<string, string>)
}

export const usePackageJson = async () => {
  const answers = await useUserAnswers()

  const readPackage = async () => {
    return JSON.parse((await readFile(answers.projectName + '/package.json')).toString('utf-8')) as Package
  }

  const writePackage = async (pkg: Package) => {
    await writeFile(answers.projectName + '/package.json', JSON.stringify(pkg, null, 2))
  }

  const addDependency = async (name: string, version: string) => {
    const pkg = await readPackage()
    if (!pkg.dependencies) { pkg.dependencies = {} }
    pkg.dependencies[name] = version
    pkg.dependencies = sortObjectKeys(pkg.dependencies)

    await writePackage(pkg)
  }

  const addDevDependency = async (name: string, version: string) => {
    const pkg = await readPackage()
    if (!pkg.devDependencies) { pkg.devDependencies = {} }
    pkg.devDependencies[name] = version
    pkg.devDependencies = sortObjectKeys(pkg.devDependencies)

    await writePackage(pkg)
  }

  return {
    addDependency,
    addDevDependency,
  }
}
