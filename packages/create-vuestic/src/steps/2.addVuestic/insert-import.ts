export const insertImport = (source: string, imports: string[]) => {
  const lines = source.split('\n')
  const importString = imports.join('\n')

  const lastImportIndex = lines.length - lines.reverse().findIndex(line => line.match(/import/))

  if (lastImportIndex > lines.length - 1) {
    lines.splice(lastImportIndex, 0, importString)

    return lines.join('\n')
  }

  return importString + '\n' + source
}
