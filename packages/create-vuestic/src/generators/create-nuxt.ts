import { execp } from './../utils/exacp';

export const createNuxt3 = (projectName: string) => {
  const command =`npx nuxi init ${projectName}`

  return execp(command)
}
