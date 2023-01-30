import { exec } from 'node:child_process';

type ExecOptions = NonNullable<Parameters<typeof exec>[1]>

export const execp = (command: string, options: ExecOptions = {}) => {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        throw error
      } else {
        return resolve(stdout ? stdout : stderr)
      }
    })
  })
}
