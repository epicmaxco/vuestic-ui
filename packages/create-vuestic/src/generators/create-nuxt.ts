import { execp } from './../utils/exacp';

export const createNuxt3 = (projectName: string) => {
  // TODO: Check if project name already exists
  const command =`npx nuxi init ${projectName}`

  return execp(command)
}
