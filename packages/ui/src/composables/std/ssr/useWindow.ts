import { useClientOnly } from './useClientOnly'

export const useWindow = () => useClientOnly(() => window as Window)
