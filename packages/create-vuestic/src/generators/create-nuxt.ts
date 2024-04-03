import { doesSatisfyNodeVersion } from '../utils/node-version';
import { execp } from './../utils/exacp';
import {getPackageManagerName} from "../utils/package-manager";

export const createNuxt3 = (projectName: string) => {
  if (!doesSatisfyNodeVersion('v16.10.0')) {
    throw new Error('Nuxt 3 requires Node.js v16.10.0 or higher. Please upgrade your Node.js version.')
  }

  const packageManager = getPackageManagerName()

  // --packageManager - provide package manager to the nuxt project
  // --gitInit - false since we provide our own git initialization
  // --no-install - we will install dependencies later
  const command =`npx nuxi@latest init ${projectName} --no-install --gitInit false --packageManager ${packageManager}`

  try {
    return execp(command)
  } catch (e) {
    throw new Error(`Error while creating Nuxt 3 project: ${e}`)
  }
}
