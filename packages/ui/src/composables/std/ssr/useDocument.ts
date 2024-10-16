import { useClientOnly } from './useClientOnly'

export const useDocument = () => useClientOnly(() => document)
