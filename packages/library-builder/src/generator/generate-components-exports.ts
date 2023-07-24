import { readFile, stat } from 'fs/promises';
import { findExports, ESMExport } from 'mlly'
import { dirname, resolve } from 'pathe'
import { readFileWithCache } from '../utils/read-file-with-cache';
import { exists } from '../utils/exists';

type ESMExportWithPath = ESMExport & { path: string }

async function findAsync<T>(arr: T[], asyncCallback: (item: T) => Promise<boolean>) {
  const promises = arr.map(asyncCallback);
  const results = await Promise.all(promises);
  const index = results.findIndex(result => result);
  return arr[index];
}

const getStat = async (path: string) => {
  try {
    return await stat(path)
  } catch {
    return null
  }
}


const resolveFromFile = async (importer: string, from: string) => {
  const importerDir = dirname(importer)
  const path = resolve(importerDir, from)

  const stats = await getStat(path)
  
  if (stats?.isFile()) {
    return path
  }

  const exts = ['ts', 'vue', 'js', 'mjs', 'mts']

  const correctExt = await findAsync(exts, (ext) => {
    return exists(path + '.' + ext)
  })

  if (correctExt) {
    return path + '.' + correctExt
  }

  const correctIndex = await findAsync(exts, async (ext) => {
    return exists(resolve(path, 'index.' + ext))
  })


  if (correctIndex) {
    return resolve(path, 'index.' + correctIndex)
  }

  return path
}

const recursiveFindExportOriginalFile = async (exp: ESMExport, currentPath: string): Promise<ESMExportWithPath[]> => {
  const { specifier, type, name, names } = exp

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

  if (!from) {
    throw new Error(`Can't resolve ${specifier} from ${currentPath}`)
  }

  const fromContent = (await readFileWithCache(from))

  const childExp = findExports(fromContent)
  
  if (type === 'star') {
    return (await Promise.all(childExp.map(async (exp) => {
      return await recursiveFindExportOriginalFile(exp, from)
    }))).flat()
  }

  if (type === 'named') {
    const reExports = childExp.filter((exp) => {
      return  names.some((name) => {
        if ( exp.names && exp.names.includes(name)) { return true }
        if (exp.type === 'star') { return true }
        return false
      })
    })

    return (await Promise.all(reExports.map(async (exp) => {
      return await recursiveFindExportOriginalFile(exp, from)
    }).flat())).flat().filter((exp) => {
      return names.some((name) => {
        if ( exp.names && exp.names.includes(name)) { return true }
        if (exp.type === 'star') { return true }
        return false
      })
    })
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