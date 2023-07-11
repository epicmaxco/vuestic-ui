import { writeFile } from 'fs/promises';
import { readFileSync } from 'fs';
import { join, parse } from "pathe";
import { LibraryFormat } from "../types/vite";

export const generateExports = (options: {
  cwd: string,
  entry?: string,
  outDir?: string,
  append?: boolean,
  targets: (LibraryFormat | 'esm-node' | 'web-components' | 'types')[],
}) => {
  const { cwd, entry } = options
  const libName = parse((entry || 'src/main.ts').split('/').pop() || 'main.ts').name

  // TODO: Remove extra exports?
  const json = {
    ".": {
      "types": `./dist/types/${libName}.d.ts`,
      "import": {
        "node": `./dist/esm-node/${libName}.mjs`,
        "default": `./dist/es/${libName}.js`
      },
      "require": `./dist/cjs/${libName}.js`
    },
    "./css": {
      "import": {
        "node": `./dist/${libName}.css`,
        "default": `./dist/styles/index.css`
      }
    },
    "./web-components": {
      "types": `./dist/types/${libName}.d.ts`,
      "default": `./dist/web-components/${libName}.js`
    },
    "./iife": `./dist/iife/${libName}.js`,
    "./types": `./dist/types/${libName}.d.ts`,
    "./dist/*": "./dist/*"
  }

  const packageJsonPath = join(cwd, 'package.json')

  const packageJsonContent = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))

  if (packageJsonContent.exports) {
    packageJsonContent.exports = Object.assign(packageJsonContent.exports, json)
  } else {
    packageJsonContent.exports = json
  }

  if (options.append) {
    writeFile(packageJsonPath, JSON.stringify(packageJsonContent, null, 2))
  }

  return packageJsonContent
}