import { readFileSync } from 'fs';
import { resolve } from 'pathe';

type PackageJSON = Partial<{
  name: string,
  version: string,
  dependencies: Record<string, string>,
  peerDependencies: Record<string, string>,
}>

export const readPackage = (path = resolve(process.cwd(), './package.json')) => {
  return JSON.parse(readFileSync(path).toString()) as PackageJSON
}