import { readFile, lstat } from 'fs/promises';
import { findExports, ESMExport } from 'mlly'
import { dirname, resolve } from 'pathe'
import { existsSync } from 'fs'

type ESMExportWithPath = ESMExport & { path: string }

const resolveFromFile = async (importer: string, from: string) => {
  const importerDir = dirname(importer)
  const path = resolve(importerDir, from)

  if (!existsSync(path)) { return importer }

  const stat = await lstat(path)

  if (stat.isFile()) {
    return path
  }

  const exts = ['ts', 'vue', 'js', 'mjs', 'mts']

  const correctExt = exts.find((ext) => {
    return existsSync(path + '.' + ext)
  })

  if (correctExt) {
    return path + '.' + correctExt
  }

  const correctIndex = exts.find((ext) => {
    return existsSync(resolve(path, 'index.' + ext))
  })


  if (correctIndex) {
    return resolve(path, 'index.' + correctIndex)
  }

  return path
}

const recursiveFindExportOriginalFile = async (exp: ESMExport, currentPath: string): Promise<ESMExportWithPath[]> => {
  const { specifier, type, name } = exp

  if (type === 'declaration') {
    return [{
      path: currentPath,
      ...exp,
    }]
  }

  // If export without specifier it means this export is originated from current file
  if (!specifier) { 
    return [{
      path: currentPath,
      ...exp,
    }]
  }

  const from = await resolveFromFile(currentPath, specifier)

  const fromContent = (await readFile(from)).toString('utf-8')

  const childExp = findExports(fromContent)
  
  if (type === 'star') {
    return (await Promise.all(childExp.map(async (exp) => {
      return await recursiveFindExportOriginalFile(exp, from)
    }))).flat()
  }

  if (type === 'named') {
    const reExport = childExp.find((exp) => {
      if (!exp.name) { return }
      return exp.name === name
    })

    if (reExport?.specifier) {
      return await recursiveFindExportOriginalFile(reExport, resolve(from, reExport.specifier))
    }

    return [{
      path: from,
      ...exp,
    }]
  }

  if (type === 'default') {
    const reExport = childExp.find((exp) => {
      if (!exp.name) { return }
      return exp.name === 'default'
    })

    if (reExport?.specifier) {
      return await recursiveFindExportOriginalFile(reExport, resolve(from, reExport.specifier))
    }

    return [{
      path: from,
      ...exp,
    }]
  }

  return [{
    path: from,
    ...exp,
  }]
}

export const fineComponents = async (entry: string) => {
  const content = await readFile(entry)

  const exports = findExports(content.toString('utf-8'))

  return (await Promise.all(exports.map(async (exp) => {
    return (await (recursiveFindExportOriginalFile(exp, entry))).flat()
  }))).flat()
}