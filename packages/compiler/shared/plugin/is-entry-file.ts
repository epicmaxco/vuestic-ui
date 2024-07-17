export const isEntryFile = (id: string) => {
  return /\/src\/main\.(ts|js|mjs|mts)$/.test(id)
}
