import { execp } from './../utils/exacp';

export const createGit = (projectName: string) => {
  execp('git init', {
    cwd: projectName,
  })
}
