import { doesSatisfyNodeVersion } from '../utils/node-version';
import { execp } from './../utils/exacp';

export const createNuxt3 = (projectName: string) => {
  if (!doesSatisfyNodeVersion('v16.10.0')) {
    throw new Error('Nuxt 3 requires Node.js v16.10.0 or higher. Please upgrade your Node.js version.')
  }

  const command =`npx nuxi init ${projectName}`

  return execp(command)
}
