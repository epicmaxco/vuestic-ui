import { useClientOnly } from './useClientOnly'

export const useWindow = () => useClientOnly(() => document)
