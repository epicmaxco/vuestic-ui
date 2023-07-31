import { stat } from 'fs/promises'

export const exists = async (path: string) => {
  try {
    await stat(path)
    return true
  } catch {
    return false
  }
}