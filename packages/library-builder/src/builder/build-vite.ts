import { UserConfig } from 'vite';
import { build as viteBuild } from 'vite'

export const buildVite = async (config: UserConfig) => {
  const result = await viteBuild(config)
  return result
}