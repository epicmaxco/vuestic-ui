import { exec } from 'child_process';
import { join } from 'pathe'
import { existsSync } from 'fs'

export const buildTypes = async (options: {
  cwd: string,
  outDir?: string,
}) => {
  const { cwd, outDir = 'dist/types' } = options

  if (!existsSync(join(cwd, 'tsconfig.json'))) {
    console.warn('No tsconfig.json found, skipping types generation')
    return
  }

  const outDirAbs = join(cwd, outDir, 'types')

  const command = `vue-tsc --declaration --emitDeclarationOnly --outDir '${outDirAbs}'`

  return exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error building types:`);
      console.error(`${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`Error building types:`);
      console.error(`stderr: ${stderr}`);
    }
  })
}