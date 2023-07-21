import { resolve } from "pathe"
import { existsSync } from 'fs'

/**
 * Return 
 * @param args 
 * @returns 
 */
export const strictResolve = (...args: string[]) => {
  const path = resolve(...args)

  if (!existsSync(path)) {
    return undefined
  }

  return path
}