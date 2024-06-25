const _debugCheckIfRegexValid = (symbol: string) => {
  try {
   new RegExp(symbol)
    return true
  } catch (e) {
    console.warn((e as Error).message)
    return false
  }
}
